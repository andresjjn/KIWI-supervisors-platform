const { Router } = require('express');
const router = Router();

const {
  getHours,
  createHour,
  getHour,
  deleteHour,
  updateHour
} = require('../controller/hours_controller');

router.route('/:date/hours')
  .get(getHours)
  .post(createHour);

router.route('/:date/hours/:hour')
  .get(getHour)
  .patch(updateHour)
  .delete(deleteHour);

module.exports = router;
