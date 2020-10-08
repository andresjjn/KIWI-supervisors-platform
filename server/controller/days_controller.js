const daysCtrl = {};

const Day = require("../models/Day");

daysCtrl.getAllDays = async (req, res) => {
  const days = await Day.find();
  res.status(200).json(days);
};

daysCtrl.createDay = async (req, res) => {
  const { date, hours } = req.body;
  const dayOfdate = await Day.findOne({ date: req.body.date });
  if (dayOfdate) {
    res.status(400).json({ error: "This day already exist" });
  } else {
    const newDay = new Day({
      date: date,
      hours: hours,
    });
    await newDay.save();
    res.status(201).json(newDay);
  }
};

daysCtrl.getDay = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    res.status(200).json(dayOfdate);
  } else {
    res.status(400).json({ error: "Day not found" });
  }
};

daysCtrl.deleteDay = async (req, res) => {
  const dayOfdate = await Day.findOneAndDelete({ date: req.params.date });
  if (dayOfdate) {
    res.status(200).json({ message: "Day Deleted" });
  } else {
    res.status(400).json({ error: "Day not found" });
  }
};

module.exports = daysCtrl;
