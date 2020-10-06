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
  const updatedDay = await Day.findOneAndUpdate(
    { date: req.params.date },
    { hours: req.body },
    { new: true, runValidators: true }
  );
  if (updatedDay) {
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

hoursCtrl.getHour = (req, res) => res.json({ a: "GET Hello Days Get 1" });
hoursCtrl.modifyHour = (req, res) => res.json({ a: "GET Hello Days Get 2" });
hoursCtrl.deleteHour = (req, res) => res.json({ a: "GET Hello Days Get 3" });
hoursCtrl.getSlots = (req, res) => res.json({ a: "GET Hello Days Get 4" });
hoursCtrl.modifySlots = (req, res) => res.json({ a: "GET Hello Days Get 5" });

module.exports = hoursCtrl;
