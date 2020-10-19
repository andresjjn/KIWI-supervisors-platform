const Day = require('../models/Day');
let date = {};
const hoursCtrl = {};

// Return an array with the hours as Objs with GET request (uri = ...days/:DATE/hours)
hoursCtrl.getHours = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    res.status(200).json(dayOfdate.hours);
  } else {
    res.status(400).json({ status: 'Error', description: 'Day not found' });
  }
};

// Create a new hour into hours array using POST request
// (uri = ...days/:DATE/hours, body = {hour:, available:})
hoursCtrl.createHour = async (req, res) => {
  date = new Date();
  if (req.body.slots || req.body.total || req.body.available) {
    res.status(400).json({ status: 'Error', description: 'Just hour parameter is suportted' });
    return;
  }
  if (!req.body.hour) {
    res.status(400).json({ status: 'Error', description: 'No hour received' });
    return;
  }
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (const hours of dayOfdate.hours) {
      if (hours.hour == req.body.hour) {
        res.status(400).json({ status: 'Error', description: 'The hour already exist' });
        return;
      }
    }
    dayOfdate.hours.push(req.body);
    dayOfdate.updated = date.toISOString();
    await dayOfdate.save();
    res.status(200).json({ status: 'Success' });
  } else {
    const newDay = new Day({
      date: req.params.date,
      hours: req.body
    });
    await newDay.save();
    res.status(201).json({ status: 'Success' });
  }
};

// Return an specific hour from a date using GET request (uri = ...days/:DATE/hours/:hour)
hoursCtrl.getHour = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (const hours of dayOfdate.hours) {
      if (hours.hour == req.params.hour) {
        res.status(200).json(hours);
        return;
      }
    }
    res.status(400).json({ status: 'Error', description: 'Hour not found' });
  } else {
    res.status(400).json({ status: 'Error', description: 'Day not found' });
  }
};

// Delete an specific hour from a date using DELETE request (uri = ...days/:DATE/hours/:hour)
hoursCtrl.deleteHour = async (req, res) => {
  date = new Date()
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        dayOfdate.hours.splice(i, 1);
        dayOfdate.updated = date.toISOString();
        await dayOfdate.save();
        res.status(200).json({ status: 'Success' });
        return;
      }
    }
    res.status(400).json({ status: 'Error', description: 'Hour not found' });
  } else {
    res.status(400).json({ status: 'Error', description: 'Day not found' });
  }
};

module.exports = hoursCtrl;
