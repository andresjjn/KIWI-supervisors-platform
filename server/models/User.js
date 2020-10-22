const { Schema, model } = require('mongoose');
const date = new Date();

const userSchema = new Schema(
  {
    created: { type: String, default: date.toISOString() },
    updated: { type: String, default: date.toISOString() },
    id: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: String,
    birthdate: String,
    address: String,
    city: String,
    country: String,
    role: {
      type: String,
      required: true
    },
    password: String
  },
  { minimize: true }
);

module.exports = model('user', userSchema);
