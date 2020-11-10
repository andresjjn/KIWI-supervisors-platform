const Day = require("../models/Day");
const statsCtrl = {};

statsCtrl.getStatsdays = async (req, res) => {
  const days = await Day.find();
  let dayCount = 0;
  const dates = [];
  if (req.query.id === undefined) {
    if (req.query.date === undefined) {
      for (day of days) {
        if (day.hours.length > 0) {
          dayCount += 1;
        }
      }
    } else {
      let aux = req.query.date;
      for (let i = 0; i < (req.query.range || 1); i++) {
        dates.push(aux.toString());
        aux++;
      }
      for (day of days) {
        if (day.hours.length > 0 && dates.includes(day.date)) {
          dayCount += 1;
        }
      }
    }
    res.json({
      days: dayCount,
      description: "All days with at least one hour created",
    });
  } else {
    if (req.query.date === undefined) {
      for (day of days) {
        for (hour of day.hours) {
          for (slot of hour.slots) {
            if (slot.id == req.query.id) {
              dayCount += 1;
              break;
            }
          }
        }
      }
    } else {
      let aux = req.query.date;
      for (let i = 0; i < (req.query.range || 1); i++) {
        dates.push(aux.toString());
        aux++;
      }
      for (day of days) {
        for (hour of day.hours) {
          for (slot of hour.slots) {
            if (slot.id == req.query.id && dates.includes(day.date)) {
              dayCount += 1;
              break;
            }
          }
        }
      }
    }
    res.json({
      id: req.query.id,
      days: dayCount,
      description: "All days with at least one hour assign ",
    });
  }
};

statsCtrl.getStatshours = async (req, res) => {
  let hourCount = 0;
  let available = 0;
  const dates = [];

  const days = await Day.find();
  if (req.query.id === undefined) {
    if (req.query.date === undefined) {
      for (day of days) {
        for (hour of day.hours) {
          hourCount += hour.total;
          available += hour.available;
        }
      }
    } else {
      let aux = req.query.date;
      for (let i = 0; i < (req.query.range || 1); i++) {
        dates.push(aux.toString());
        aux++;
      }
      for (day of days) {
        for (hour of day.hours) {
          if (dates.includes(day.date)) {
            hourCount += hour.total;
            available += hour.available;
          }
        }
      }
    }
    res.json({
      hours: hourCount,
      available: available,
      description: "All hours and all available hours ",
    });
  } else {
    if (req.query.date === undefined) {
      for (day of days) {
        for (hour of day.hours) {
          for (slot of hour.slots) {
            if (slot.id == req.query.id) {
              hourCount += 1;
            }
          }
        }
      }
    } else {
      let aux = req.query.date;
      for (let i = 0; i < (req.query.range || 1); i++) {
        dates.push(aux.toString());
        aux++;
      }
      for (day of days) {
        for (hour of day.hours) {
          for (slot of hour.slots) {
            if (slot.id == req.query.id && dates.includes(day.date)) {
              hourCount += 1;
            }
          }
        }
      }
    }
    res.json({
      id: req.query.id,
      hours: hourCount,
      description: "All hours assign ",
    });
  }
};

statsCtrl.getStatsprices = async (req, res) => {
  let priceCount = 0;
  let assignHours = 0;
  const dates = [];

  const days = await Day.find();
  if (req.query.id === undefined) {
    if (req.query.date === undefined) {
      for (day of days) {
        for (hour of day.hours) {
          assignHours += hour.total - hour.available;
          priceCount += (hour.total - hour.available) * hour.price;
        }
      }
    } else {
      let aux = req.query.date;
      for (let i = 0; i < (req.query.range || 1); i++) {
        dates.push(aux.toString());
        aux++;
      }
      for (day of days) {
        for (hour of day.hours) {
          if (dates.includes(day.date)) {
            assignHours += hour.total - hour.available;
            priceCount += (hour.total - hour.available) * hour.price;
          }
        }
      }
    }
    res.json({
      assignHours: assignHours,
      totalPrice: priceCount,
      description: "Number of assign hours, total price for it",
    });
  } else {
    if (req.query.date === undefined) {
      for (day of days) {
        for (hour of day.hours) {
          for (slot of hour.slots) {
            if (slot.id == req.query.id) {
              assignHours += 1;
              priceCount += 1 * hour.price;
            }
          }
        }
      }
    } else {
      let aux = req.query.date;
      for (let i = 0; i < (req.query.range || 1); i++) {
        dates.push(aux.toString());
        aux++;
      }
      for (day of days) {
        for (hour of day.hours) {
          for (slot of hour.slots) {
            if (slot.id == req.query.id && dates.includes(day.date)) {
              assignHours += 1;
              priceCount += 1 * hour.price;
            }
          }
        }
      }
    }
    res.json({
      id: req.query.id,
      assignHours: assignHours,
      totalPrice: priceCount,
      description: "Number of assign hours, total price for it",
    });
  }
};

module.exports = statsCtrl;
