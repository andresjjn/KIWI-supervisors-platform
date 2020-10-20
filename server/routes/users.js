const { Router } = require('express');
const router = Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('../controller/users_controller');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
