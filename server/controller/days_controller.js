const daysCtrl = {};

const Day = require("../models/Day");

daysCtrl.getAllDays = async (req, res) => {
  const days = await Day.find();
  res.json(days);
};

daysCtrl.createDay = async (req, res) => {
  console.log(req.body);
  const { date, hours } = req.body;
  const newDay = new Day({
    date: date,
    hours: hours,
  });
  await newDay.save();
  res.json({ message: "Day Created" });
};

daysCtrl.getDay = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.id });

  res.json(dayOfdate);
};

daysCtrl.deleteDay = (req, res) => res.json({ a: "GET Hello Days Get" });

module.exports = daysCtrl;
