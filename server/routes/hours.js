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

router.route("/:day/hours").get(getHours).put(createHour);

router.route("/:day/:hour").get(getHour).put(modifyHour).delete(deleteHour);

router.route("/:day/:hour/slots").get(getSlots).put(modifySlots);

module.exports = router;
