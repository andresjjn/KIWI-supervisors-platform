require('./functions/connection');
const deleteUser = require('./functions/manageUser').deleteUser;

async function newU () {
	const user = await deleteUser('5f7b2bd00258f20530afccc4');
	console.log(user);
}
newU()
