const { Router } = require('express');
const router = Router();

const {
  getHours,
  createHour,
  getHour,
  deleteHour
} = require('../controller/hours_controller');

router.route('/:date/hours')
  .get(getHours)
  .post(createHour);

router.route('/:date/hours/:hour')
  .get(getHour)
  .delete(deleteHour);

module.exports = router;
