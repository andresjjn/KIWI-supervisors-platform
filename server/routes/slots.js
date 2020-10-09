const { Router } = require("express");
const router = Router();

const {
  getSlots,
  modifySlots,
  createSlots,
  deleteSlots
} = require("../controller/slots_controller");

router.route("/:date/hours/:hour/slots")
.get(getSlots)
.post(createSlots)
.put(modifySlots)
.delete(deleteSlots);

module.exports = router;
