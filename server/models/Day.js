const { Schema, model } = require("mongoose");

daySchema = new Schema(
  {
    date: {
      type: Number,
      unique: true,
    },
    hours: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

module.exports = model("day", daySchema);
