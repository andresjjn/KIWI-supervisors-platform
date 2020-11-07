const Day = require('../models/Day');
const daysCtrl = {};

// Get all days with GET request (.../days)
daysCtrl.getAllDays = async (req, res) => {
  const days = await Day.find();
  res.status(200).json(days);
};

// Create a day passing a Obj with date and POST request (uri = .../days) (body = {date: ""})
daysCtrl.createDay = async (req, res) => {
  const { date, hours } = req.body;
  if (!date) {
    res.status(400).json({ error: 'No date received' });
    return;
  }
  const dayOfdate = await Day.findOne({ date: req.body.date });
  if (dayOfdate) {
    res.status(400).json({ error: 'This day already exist' });
  } else {
    const newDay = new Day({
      date: date,
      hours: hours
    });
    await newDay.save();
    res.status(201).json(newDay);
  }
};

// Return day Obj using GET request (uri = .../days/:DATE)
daysCtrl.getDay = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    res.status(200).json(dayOfdate);
  } else {
    res.status(400).json({ error: 'Day not found' });
  }
};

// Delete a day from DB using REMOVE request (uri = .../days/:DATE)
daysCtrl.deleteDay = async (req, res) => {
  const dayOfdate = await Day.findOneAndDelete({ date: req.params.date });
  if (dayOfdate) {
    res.status(200).json({ message: 'Day Deleted' });
  } else {
    res.status(400).json({ error: 'Day not found' });
  }
};

module.exports = daysCtrl;
