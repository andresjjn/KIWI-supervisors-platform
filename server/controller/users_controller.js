const User = require('../models/User');
const usersCtrl = {};

// Get all users with GET request (body = .../users)
usersCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

// Create a user passing a Obj with id and role params, using POST request (uri = .../days) (body = {date: ""})
usersCtrl.createUser = async (req, res) => {
  const { id, role } = req.body;
  if (!id || !role) {
    res.status(400).json({ status: 'Error', description: 'No id or role parameter found' });
    return;
  }
  const user = await User.findOne({ id: req.body.id });
  if (user) {
    res.status(400).json({ status: 'Error', description: 'User already exist' });
  } else {
    const newUser = new User({
      id: id,
      role: role
    });
    await newUser.save();
    res.status(201).json({ status: 'Success' });
  }
};

// Update data of a user using REMOVE request (uri = .../user/:id)
usersCtrl.updateUser = async (req, res) => {
  const user = await User.findOne({ id: req.params.id });
  if (user) {
    if (req.body.id) {
      delete req.body.id;
    }
    Object.assign(user, req.body);
    await User.findOneAndUpdate({ id: req.params.id }, user);
    res.status(200).json({ status: 'Success' });
  } else {
    res.status(400).json({ status: 'Error', description: 'User not found' });
  }
};

// Get particualr user using GET request (uri = .../user/:id )
usersCtrl.getUser = async (req, res) => {
  const user = await User.findOne({ id: req.params.id });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ status: 'Error', description: 'User not found' });
  }
};

// Delete a day from DB using REMOVE request (uri = .../days/:DATE)
usersCtrl.deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete({ id: req.params.id });
  if (user) {
    res.status(200).json({ status: 'Success' });
  } else {
    res.status(400).json({ status: 'Error', description: 'User not found' });
  }
};

module.exports = usersCtrl;
