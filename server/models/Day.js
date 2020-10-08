const { Schema, model } = require("mongoose");

daySchema = new Schema(
  {
    date: {
      type: String,
      unique: true,
      required: true,
      maxlength: 8,
      minlength: 8,
    },
    hours: [
      {
        _id: false,
        hour: { type: Number, required: true, min: 0, max: 23 },
        available: { type: Number, required: true, min: 0 },
        slots: [],
      },
    ],
  },
  { minimize: true }
);

module.exports = model("day", daySchema);