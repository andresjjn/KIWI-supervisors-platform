const Day = require('../models/day');

exports.updateDay = async (data, date) => {
	if (data) {
		const day = await Day.findOne({date: date})
			.catch(error => console.log('No day found'));
		if (day) {
			for (const [key, value] of Object.entries(data)) {
				day[key] = value;
			}
			await Day.findOneAndUpdate({date: date}, day);
			return 'Day updated';
		}
	} else {
		console.error('No object passed as argument');
	}
	return null;
};


exports.newDay = async (data) => {
  const newDay = new Day(data);
	const DaySaved = await newDay.save();
	return DaySaved;
};

exports.deleteDay = async (date) => {
	await Day.findOneAndDelete({date: date});
	return `Day with id: ${date} was deleted`;
};
