const { findOneAndUpdate } = require("../models/Day");
const Day = require("../models/Day");
const hoursCtrl = {};

hoursCtrl.getHours = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    res.status(200).json(dayOfdate.hours);
  } else {
    res.status(404).json({ error: "Day not found" });
  }
};

hoursCtrl.createHour = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    const updatedDay = await Day.findOneAndUpdate(
      { date: req.params.date },
      { hours: req.body }
    );
    res.status(200).json(updatedDay);
  } else {
    const newDay = new Day({
      date: req.params.date,
      hours: req.body,
    });
    await newDay.save();
    res.status(201).json(newDay);
  }
};
hoursCtrl.getHour = (req, res) => res.json({ a: "GET Hello Days Get" });
hoursCtrl.modifyHour = (req, res) => res.json({ a: "GET Hello Days Get" });
hoursCtrl.deleteHour = (req, res) => res.json({ a: "GET Hello Days Get" });
hoursCtrl.getSlots = (req, res) => res.json({ a: "GET Hello Days Get" });
hoursCtrl.modifySlots = (req, res) => res.json({ a: "GET Hello Days Get" });

module.exports = hoursCtrl;
