const express = require("express");
const cors = require("cors");

const app = express();

//settings
const PORT = process.env.PORT || 5000;

//middelwars
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/days", require("./routes/days"));
app.use("/api/v1/", require("./routes/hours"));

module.exports = { app, PORT };
