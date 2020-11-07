const { Schema, model } = require("mongoose");

userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    documentId: {
      type: Number,
      unique: true,
      required: true
    },
    birthdate: String,
    address: String,
    city: String,
    country: String,
    role: {
          type: String,
          required: true
    }
    },
      { minimize: true }
);

module.exports = model("user", userSchema);
