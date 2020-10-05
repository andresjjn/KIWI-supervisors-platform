const User = require('../models/user');

exports.updateUser = async (data, userId) => {
	if (data) {
		const user = await User.findById(userId)
			.catch(error => console.log('No user found'));
		if (user) {
			for (const [key, value] of Object.entries(data)) {
				user[key] = value;
			}
			await User.findByIdAndUpdate(userId, user);
			return 'User updated';
		}
	} else {
		console.error('No object passed as argument');
	}
	return null;
};

exports.newUser = async (data) => {
	if ('name' in data && 'documentId' in data && 'role' in data) {
		const newUser = new User(data);
		const userSaved = await newUser.save();
		return userSaved;
	} else {
		console.error('No name, documentId or role passed as parameter');
	}
	return null;
};

exports.deleteUser = async (userId) => {
	await User.findByIdAndDelete(userId);
	return `User with id: ${userId} was deleted`;
};
