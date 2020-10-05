require('./functions/connection');
const newUser = require('./functions/manageUser').newUser;
const newDay = require('./functions/manageDay').newDay;
const data1 = {
	name: 'Javier Solis',
	documentId: 53464512,
	birthdate: '08/05/1970',
	address: 'FakeStreet 123',
	city: 'México City',
	country: 'México',
	role: 'Supervisor'
}
const data2 = {
	date: 20201005
}

async function newU () {
	const user = await newUser(data1);
	console.log(user);
}

async function newD () {
	const day = await newDay(data2);
	console.log(day);
}

newU()
newD()
