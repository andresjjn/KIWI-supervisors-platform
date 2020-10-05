require('./functions/connection');
const updateDay = require('./functions/manageDay').updateDay;
const data1 = {
	'modifiedBy': 'Paterson J',
	'hours': {
		'0': {
			'available': 0,
		}}
}

async function newU () {
	const user = await updateDay(data1, 20201005);
	console.log(user);
}
newU()
