const Day = require('../models/Day');
const slotsCtrl = {};

// Return the slots from a specific hour and date (uri = ...days/:DATE/hours/:hour/slots)
slotsCtrl.getSlots = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (const hours of dayOfdate.hours) {
      if (hours.hour == req.params.hour) {
        res.status(200).json(hours.slots);
        return;
      }
    }
    res.status(400).json({ error: 'Hour not found' });
  } else {
    res.status(400).json({ error: 'Day not found' });
  }
};

// Modify slots from a hour and date is specific using PUT request
// (uri = ...days/:DATE/hours/:hour/slots, body = {user data})
slotsCtrl.modifySlots = async (req, res) => {
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
    res.status(400).json({ error: 'Hour not found' });
  } else {
    res.status(400).json({ error: 'Day not found' });
  }
};

// Create slots for a hour and date is specific using POST request
// (uri = ...days/:DATE/hours/:hour/slots, body = {user data})
slotsCtrl.createSlots = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (!dayOfdate) {
    const arr = [];
    for (let i = 0; i < req.body.available; i++) {
      arr.push({ status: 'available' });
    }
    const newDay = new Day({
      date: req.params.date,
      hours: [{
        hour: req.params.hour,
        available: req.body.available,
        slots: arr
      }]
    });
    await newDay.save();
    res.status(200).json(newDay);
    return;
  }
  for (let i = 0; i < dayOfdate.hours.length; i++) {
    if (dayOfdate.hours[i].hour == req.params.hour) {
      for (let j = 0; j < req.body.available; j++) {
        dayOfdate.hours[i].slots.push({ status: 'available' });
      }
      dayOfdate.hours[i].available += dayOfdate.hours[i].slots.length;
      await Day.findOneAndUpdate({ date: req.params.date }, dayOfdate);
      res.status(200).json(await Day.findOne({ date: req.params.date }));
      return;
    }
  }
};

// Remove for a hour and date is specific using REMOVE request
// (uri = ...days/:DATE/hours/:hour/slots, body = {delete: })
slotsCtrl.deleteSlots = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        for (let j = 0; j < req.body.delete; j++) {
          dayOfdate.hours[i].slots.pop();
          dayOfdate.hours[i].available = dayOfdate.hours[i].slots.length;
        }
        dayOfdate.save();
        res.status(200).json(dayOfdate);
        return;
      }
    }
    res.status(400).json({ error: 'Hour not found' });
  } else {
    res.status(400).json({ error: 'Day not found' });
  }
};

// Fill a slot with user info using PATCH request
// (uri = ...days/:DATE/hours/:hour/slots, body = {userInfo})
slotsCtrl.fillSlot = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        if (dayOfdate.hours[i].available > 0) {
          const pos = dayOfdate.hours[i].slots.length - dayOfdate.hours[i].available;
          dayOfdate.hours[i].slots[pos] = req.body;
          dayOfdate.hours[i].available -= 1;
          await Day.findOneAndUpdate({ date: req.params.date }, dayOfdate);
          res.status(200).json(await Day.findOne({ date: req.params.date }));
          return;
        } else {
          res.status(400).json({ error: 'Not slots availables' });
          return;
        }
      }
    }
    res.status(400).json({ error: 'Hour not found' });
  } else {
    res.status(400).json({ error: 'Day not found' });
  }
};

module.exports = slotsCtrl;
