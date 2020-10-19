const { Router } = require('express');
const router = Router();

const {
  getSlots,
  createSlots,
  deleteSlots,
  getSlot,
  fillSlot,
  deleteSlot
} = require('../controller/slots_controller');
const { route } = require('./hours');

router.route('/:date/hours/:hour/slots')
  .get(getSlots)
  .post(createSlots)
  .delete(deleteSlots)
  .patch(fillSlot);

router.route('/:date/hours/:hour/slots/:id')
  .get(getSlot)
  .delete(deleteSlot);

module.exports = router;
