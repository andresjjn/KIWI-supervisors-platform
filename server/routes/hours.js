const { Router } = require("express");
const router = Router();

const {
  getHours,
  createHour,
  getHour,
  modifyHour,
  deleteHour,
  changeHour
} = require("../controller/hours_controller");

router.route("/:date/hours")
  .get(getHours)
  .post(createHour);

router.route("/:date/hours/:hour")
  .get(getHour)
  .put(modifyHour)
  .patch(changeHour)
  .delete(deleteHour);

module.exports = router;
