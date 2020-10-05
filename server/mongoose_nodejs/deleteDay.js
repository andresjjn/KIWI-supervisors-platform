require('./functions/connection');
const deleteDay = require('./functions/manageDay').deleteDay;

async function newU () {
	const day = await deleteDay(20201005);
	console.log(day);
}

newU()
