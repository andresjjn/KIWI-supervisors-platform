const { Router } = require("express");
const router = Router();

const {
  getStatsdays,
  getStatshours,
  getStatsprices,
} = require("../controller/stats_controller");

router.route("/days").get(getStatsdays);
router.route("/hours").get(getStatshours);
router.route("/prices").get(getStatsprices);

module.exports = router;
