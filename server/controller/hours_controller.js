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
// (uri = ...days/:DATE/hours, body = {hour:, price:})
hoursCtrl.createHour = async (req, res) => {
  date = new Date();
  if (req.body.slots || req.body.total || req.body.available) {
    res.status(400).json({ status: 'Error', description: 'hour or price parameters no found' });
    return;
  }
  if (!req.body.hour) {
    res.status(400).json({ status: 'Error', description: 'No hour received' });
    return;
  } else if (!req.body.price) {
    res.status(400).json({ status: 'Error', description: 'No price received' });
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

// Modify an hour using PATCH request
// (uri = ...days/:DATE/hours/:HOUR, body = {slots:, price:})
hoursCtrl.updateHour = async (req, res) => {
  date = new Date();
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        if (req.body.price) {
          dayOfdate.hours[i].price = req.body.price;
        }
        if (req.body.slots < 0) {
          res.status(400).json({ status: 'Error', description: 'slots parameter less than 0' });
          return;
        }
        const counter = dayOfdate.hours[i].total - req.body.slots;
        if (counter == dayOfdate.hours[i].total) {
          dayOfdate.hours[i].slots = [];
          dayOfdate.hours[i].total = 0;
          dayOfdate.hours[i].available = 0;
        } else if (counter < 0) {
          for (let j = 0; j < counter * -1; j++) {
            dayOfdate.hours[i].slots.push({});
          }
          dayOfdate.hours[i].available += counter * -1;
          dayOfdate.hours[i].total += counter * -1;
        } else if (counter > 0) {
          let av = 0;
          let to = 0;
          for (let j = 0; j < counter; j++) {
            dayOfdate.hours[i].slots.pop();
          }
          for (const k of dayOfdate.hours[i].slots) {
            if (!k.id) {
              to += 1;
              av += 1;
            } else {
              to += 1;
            }
          }
          dayOfdate.hours[i].available = av;
          dayOfdate.hours[i].total = to;
        }
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
