const Day = require("../models/Day");
const hoursCtrl = {};

//Return an array with the hours as Objs with GET request (uri = ...days/:DATE/hours)
hoursCtrl.getHours = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    res.status(200).json(dayOfdate.hours);
  } else {
    res.status(400).json({ error: "Day not found" });
  }
};

//Create a new hour into hours array using POST request (uri = ...days/:DATE/hours, body = {hour:, available:})
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

//Return the an specific hour from a date using GET request (uri = ...days/:DATE/hours/:hour)
hoursCtrl.getHour = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });
  if (dayOfdate) {
    for (hours of dayOfdate.hours) {
      if (hours.hour == req.params.hour) {
        res.status(200).json(hours);
        return;
      }
    }
    res.status(400).json({ error: "Hour not found" });
  } else {
    res.status(400).json({ error: "Day not found" });
  }
};


//Modify an specific hour from a date using PUT request (uri = ...days/:DATE/hours/:hour,  body = {hour: , available: })
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
    res.status(400).json({ error: "Hour not found" });
  } else {
    res.status(400).json({ error: "Day not found" });
  }
};


//Delete an specific hour from a date using PUT request (uri = ...days/:DATE/hours/:hour)
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
    res.status(400).json({ error: "Hour not found" });
  } else {
    res.status(400).json({ error: "Day not found" });
  }
};

//Change hour using PATCH request (uri = ...days/:DATE/hours/:hour,  body = {hour: ,})
hoursCtrl.changeHour = async (req, res) => {
  const dayOfdate = await Day.findOne({ date: req.params.date });

  if (dayOfdate) {
    if (!req.body.hour) {
      res.status(400).json({ error: "Hour no passed as argument" });
      return;
    };
    let exist = 0;
    for (let i = 0; i < dayOfdate.hours.length; i++) {
       if (dayOfdate.hours[i].hour == req.params.hour) {
         exist = 1;
       }
    }
    if (exist == 0) {
      res.status(400).json({ error: "Hour not found" });
      return;
    }
    for (let j = 0; j < dayOfdate.hours.length; j++) {
      if (dayOfdate.hours[j].hour == req.body.hour) {
        res.status(400).json({ error: "Hour passed already exist" });
        return;
      }
    };
    
    for (let i = 0; i < dayOfdate.hours.length; i++) {
      if (dayOfdate.hours[i].hour == req.params.hour) {
        dayOfdate.hours[i].hour = req.body.hour;
        dayOfdate.save();
        res.status(200).json(dayOfdate);
        return;
      }
    };
  } else {
    res.status(400).json({ error: "Day not found" });
  }
};
module.exports = hoursCtrl;
