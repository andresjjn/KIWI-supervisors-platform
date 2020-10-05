require('./functions/connection');
const newSlots = require('./functions/manageSlot').newSlots;

async function newS () {
	//newSlots(AAAAMMDD, hour, slots)
	const slots= await newSlots(20201005, 5, 5);
	console.log(slots);
}
newS();
