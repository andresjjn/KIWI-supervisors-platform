const { Router } = require("express");
const router = Router();

const {
  getAllDays,
  createDay,
  getDay,
  deleteDay,
} = require("../controller/days_controller");

router.route("/").get(getAllDays).post(createDay);

router.route("/:id").get(getDay).delete(deleteDay);

module.exports = router;
