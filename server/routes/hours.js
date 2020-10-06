const { Router } = require("express");
const router = Router();

const {
  getHours,
  createHour,
  getHour,
  modifyHour,
  deleteHour,
  getSlots,
  modifySlots,
} = require("../controller/hours_controller");

router.route("/:date/hours").get(getHours).put(createHour);

router.route("/:date/:hours").get(getHour).put(modifyHour).delete(deleteHour);

router.route("/:date/:hour/slots").get(getSlots).put(modifySlots);

module.exports = router;
