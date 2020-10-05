const { deflateSync } = require('zlib');
const Day = require('../models/day');
const User = require('../models/user');

exports.fillSlot = async (date, hour, userId) => {
	if (hour <= 23 && hour >= 0) { 
		const day = await Day.findOne({date: date})
			.catch(error => console.error('Day not founded'));
		if (day && day.hours[hour].slots) {
			const user = await User.findById(userId)
				.catch(error => console.log(`User with id: ${userId} doesn´t exist`));
				if (!user) {
					return null;
				}
			for (let i = 0; i < day.hours[hour].slots.length; i++) {
				if (day.hours[hour].slots[i].state == 'available' && day.hours[hour].available > 0) {
					day.hours[hour].available -= 1;
					day.hours[hour].slots[i] = {state: 'full', userId: userId, name: user.name};
					const slot = await Day.findOneAndUpdate({date: date}, day);
					slot.save();
					return `Space asigned in ${i}`
				}
			}
			console.log('All slots assigned or not created');
			return null;
		} 
	} else {
		console.error('Not valid time: Hours allowed between 0 and 23');
	}
	return null;
}

exports.newSlots = async (date, hour, numSlots) => {
	if (hour >= 0 && hour < 24 && numSlots >= 0) {
		const day = await Day.findOne({date: date});
		if (day) { 
			if (day.hours.state == 'empty') {
				day.hours[hour] = {available: 0, slots: []};
				day.hours.state = 'non-empty'
			}
			for (let i = 0; i < numSlots; i++) {
				day.hours[hour].slots.push({state: 'available'});
				day.hours[hour].available += 1;
			}
			const slot = await Day.findOneAndUpdate({date: date}, day);
			slot.save();
			const availables = day.hours[hour].slots.length;
			return `Add ${numSlots} slots in ${hour} of ${date} [total: ${availables}]`;
		} else {
			console.error('Date not found');
		}
	} else if (numSlots < 0) {
		console.error('Number of slots can not be less than 0');
	} else {
		console.error('Not valid time: Hours allowed between 0 and 23');
	}
};

exports.updateSlots = async (date, hour, numSlots) => {
	if (hour >= 0 && hour < 24 && numSlots >= 0) {
		const day = await Day.findOne({date: date});
		if (day) {
			if (day.hours.state == 'empty') {
				return 'Not slots created'
			}
			let delta = 0;
			if (numSlots === 0) {
				day.hours = {state: 'empty'};
			} else if (day.hours[hour].slots.length < numSlots) {
				delta = numSlots - day.hours[hour].slots.length;
				for (let i = 0; i < delta; i++) {
					day.hours[hour].slots.push({state: 'available'});
					day.hours[hour].available += 1;
				}
			} else if (day.hours[hour].slots.length > numSlots) {
				for (let i = day.hours[hour].slots.length - 1; i >= numSlots; i--) {
					day.hours[hour].slots.pop();
					day.hours[hour].available -= 1;
				}
			}
			const slot = await Day.findOneAndUpdate({date: date}, day);
			slot.save();
			const availables = 0; 
			if (day.hours.state !== 'empty') {
				avalaibles = day.hours[hour].available;
			}
			return `Updated ${numSlots} slots in ${hour} of ${date} [total: ${availables}]`;
		} else {
			console.error('Date not found');
		}	
	} else if (numSlots < 0) {
		console.error('Number of slots can not be less than 0');
	} else {
		console.error('Not valid time: Hours allowed between 0 and 23');
	}
};
