const { json } = require('express');
const Day = require('../models/Day');
const User = require('../models/User');
let date = {};
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
    res.status(400).json({ status: 'Error', description: 'Hour not found' });
  } else {
    res.status(400).json({ status: 'Error', description: 'Day not found' });
  }
};

// Create slots for a hour and date is specific using POST request
// (uri = ...days/:DATE/hours/:hour/slots, body = {available: })
slotsCtrl.createSlots = async (req, res) => {
  date = new Date();
  if (!req.body.available || req.body.available < 0) {
    res.status(400).json({ status: 'Error', description: 'No available parameter founded or less than 1' });
    return;
  } else if (!req.body.price || req.body.price < 0) {
    res.status(400).json({ status: 'Error', description: 'No price parameter founded or less than 1' });
    return;
  }
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (!dayOfdate) {
    const arr = [];
    for (let i = 0; i < req.body.available; i++) {
      arr.push({});
    }
    const newDay = new Day({
      date: req.params.date,
      hours: [{
        hour: req.params.hour,
        available: req.body.available,
        price: req.body.price,
        total: req.body.available,
        slots: arr
      }]
    });
    await newDay.save();
    res.status(201).json({ status: 'Success' });
  } else {
    let flag = 0;
    for (const hours of dayOfdate.hours) {
      if (hours.hour == req.params.hour) {
        flag = 1;
      }
    }
    if (flag === 0) {
      dayOfdate.hours.push({'hour': req.params.hour});
    }
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        for (let j = 0; j < req.body.available; j++) {
          dayOfdate.hours[i].slots.push({});
        }
        dayOfdate.hours[i].available += req.body.available;
        dayOfdate.hours[i].total += req.body.available;
        dayOfdate.hours[i].price = req.body.price;
        dayOfdate.updated = date.toISOString();
        await Day.findOneAndUpdate({ date: req.params.date }, dayOfdate);
        res.status(201).json({ status: 'Success' });
        return;
      }
    }
  }
};

// Remove for a hour and date is specific using REMOVE request
// (uri = ...days/:DATE/hours/:hour/slots, body = {delete: })
slotsCtrl.deleteSlots = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    if (!req.body.delete) {
      res.status(400).json({ status: 'Error', description: 'No delete parameter founded' });
      return;
    }
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        let remove = 0;
        let av = 0;
        let to = 0;
        if (req.body.delete > dayOfdate.hours[i].slots.length) {
          remove = dayOfdate.hours[i].slots.length;
        } else {
          remove = req.body.delete;
        }
        for (let j = 0; j < remove; j++) {
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
        await Day.findOneAndUpdate({ date: req.params.date }, dayOfdate);
        res.status(200).json({ status: 'Success' });
        return;
      }
    }
    res.status(400).json({ status: 'Error', description: 'Hour not found' });
  } else {
    res.status(400).json({ status: 'Error', description: 'Day not found' });
  }
};

// Return a slot from a specific hour and date (uri = ...days/:DATE/hours/:hour/slots/:id)
slotsCtrl.getSlot = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        for (const j of dayOfdate.hours[i].slots) {
          if (j.id && j.id == req.params.id) {
            res.status(200).json(j);
            return;
          }
        }
        res.status(400).json({ status: 'Error', description: 'Id not found' });
      }
    }
    res.status(400).json({ status: 'Error', description: 'Hour not found' });
  } else {
    res.status(400).json({ status: 'Error', description: 'Day not found' });
  }
};

// Fill a slot with user info using PATCH request
// (uri = ...days/:DATE/hours/:hour/slots, body = {userInfo})
slotsCtrl.fillSlot = async (req, res) => {
  date = new Date();
  if (!req.body.id) {
    res.status(400).json({ status: 'Error', description: 'No id parameter founded' });
    return;
  }
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        if (dayOfdate.hours[i].available > 0) {
          const pos = dayOfdate.hours[i].slots.length - dayOfdate.hours[i].available;
          dayOfdate.hours[i].slots[pos] = req.body;
          const user = await User.findOne({ id: req.body.id });
          if (user) {
            dayOfdate.hours[i].slots[pos].name = user.name;
          }
          dayOfdate.hours[i].available -= 1;
          dayOfdate.updated = date.toISOString();
          await Day.findOneAndUpdate({ date: req.params.date }, dayOfdate);
          res.status(200).json({ status: 'Success' });
          return;
        } else {
          res.status(400).json({ status: 'Error', description: 'Not slots availables' });
          return;
        }
      }
    }
    res.status(400).json({ status: 'Error', description: 'Hour not found' });
  } else {
    res.status(400).json({ status: 'Error', description: 'Day not found' });
  }
};

// Remove a slot from a specific hour and date (uri = ...days/:DATE/hours/:hour/slots/:id)
slotsCtrl.deleteSlot = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        for (let j = 0; j < dayOfdate.hours[i].slots.length; j++) {
          if (dayOfdate.hours[i].slots[j].id && dayOfdate.hours[i].slots[j].id == req.params.id) {
            dayOfdate.hours[i].slots[j] = {};
            dayOfdate.hours[i].available += 1;
            await Day.findOneAndUpdate({ date: req.params.date }, dayOfdate);
            res.status(200).json({ status: 'Success' });
            return;
          }
        }
        res.status(400).json({ status: 'Error', description: 'Id not found' });
      }
    }
    res.status(400).json({ status: 'Error', description: 'Hour not found' });
  } else {
    res.status(400).json({ status: 'Error', description: 'Day not found' });
  }
};

module.exports = slotsCtrl;
