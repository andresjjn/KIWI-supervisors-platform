require('./functions/connection');
const updateSlots = require('./functions/manageSlot').updateSlots;

async function newS () {
	//newSlots(AAAAMMDD, hour, slots)
	const slots= await updateSlots(20201005, 5, 0);
	console.log(slots);
}
newS();
