const { Router } = require('express');
const router = Router();

const {
  getSlots,
  modifySlots,
  createSlots,
  deleteSlots,
  fillSlot
} = require('../controller/slots_controller');

router.route('/:date/hours/:hour/slots')
  .get(getSlots)
  .post(createSlots)
  .put(modifySlots)
  .patch(fillSlot)
  .delete(deleteSlots);

module.exports = router;
