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
  if (!date || date.length != 8) {
    res.status(400).json({ status: 'Error', description: 'No date passed or incorrect lenght of date' });
    return;
  }
  const dayOfdate = await Day.findOne({ date: req.body.date });
  if (dayOfdate) {
    res.status(400).json({ status: 'Error', description: 'Day already exist' });
  } else {
    const newDay = new Day({
      date: date,
      hours: hours
    });
    await newDay.save();
    res.status(201).json({status: 'Success'});
  }
};

// Return day Obj using GET request (uri = .../days/:DATE)
daysCtrl.getDay = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    res.status(200).json(dayOfdate);
  } else {
    res.status(400).json({ status: 'Error', description: 'Day not found' });
  }
};

// Delete a day from DB using REMOVE request (uri = .../days/:DATE)
daysCtrl.deleteDay = async (req, res) => {
  const dayOfdate = await Day.findOneAndDelete({ date: req.params.date });
  if (dayOfdate) {
    res.status(200).json({ status: 'Success' });
  } else {
    res.status(400).json({ status: 'Error', description: 'Day not found' });
  }
};

module.exports = daysCtrl;
