require('./functions/connection');
const updateUser = require('./functions/manageUser').updateUser;

const data1 = {
	country: 'Cuba',
	role: 'Administrativo'
}

async function newU () {
	const user = await updateUser(data1, '5f7b2bd00258f20530afccc4');
	console.log(user);
}
newU()
