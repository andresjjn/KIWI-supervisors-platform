const { Schema, model } = require("mongoose");

daySchema = new Schema(
  {
    date: {
      type: Number,
      unique: true,
      default: () => {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        return year + month + date;
      },
    },
    hours: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

module.exports = model("day", daySchema);
