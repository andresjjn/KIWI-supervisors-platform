require('./functions/connection');
const fillSlot = require('./functions/manageSlot').fillSlot;

async function newSl () {
	const slot= await fillSlot(20201005, 5, '5f7b2bd00258f20530afccc4');
	console.log(slot);
}
newSl();
