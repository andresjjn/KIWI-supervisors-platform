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
    dayOfdate.hours.push(req.body);
    await dayOfdate.save();
    res.status(200).json(dayOfdate);
  } else {
    const newDay = new Day({
      date: req.params.date,
      hours: req.body,
    });
    await newDay.save();
    res.status(201).json(newDay);
  }
};

hoursCtrl.getHour = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (hours of dayOfdate.hours) {
      if (hours.hour == req.params.hour) {
        res.status(200).json(hours);
        return;
      }
    }
    res.status(404).json({ error: "Hour not found" });
  } else {
    res.status(404).json({ error: "Day not found" });
  }
};

hoursCtrl.modifyHour = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        dayOfdate.hours[i] = req.body;
        dayOfdate.save();
        res.status(200).json(dayOfdate);
        return;
      }
    }
    res.status(404).json({ error: "Hour not found" });
  } else {
    res.status(404).json({ error: "Day not found" });
  }
};

hoursCtrl.deleteHour = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        dayOfdate.hours.splice(i, 1);
        dayOfdate.save();
        res.status(200).json(dayOfdate);
        return;
      }
    }
    res.status(404).json({ error: "Hour not found" });
  } else {
    res.status(404).json({ error: "Day not found" });
  }
};
hoursCtrl.getSlots = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (hours of dayOfdate.hours) {
      if (hours.hour == req.params.hour) {
        res.status(200).json(hours.slots);
        return;
      }
    }
    res.status(404).json({ error: "Hour not found" });
  } else {
    res.status(404).json({ error: "Day not found" });
  }
};

hoursCtrl.modifySlots = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        dayOfdate.hours[i].slots = req.body;
        dayOfdate.save();
        res.status(200).json(dayOfdate);
        return;
      }
    }
    res.status(404).json({ error: "Hour not found" });
  } else {
    res.status(404).json({ error: "Day not found" });
  }
};

module.exports = hoursCtrl;
