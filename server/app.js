const express = require("express");
const cors = require("cors");

const app = express();

// settings
const PORT = process.env.PORT || 5000;

// middelwars
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/days", require("./routes/days"));
app.use("/api/v1/days", require("./routes/hours"));
app.use("/api/v1/days", require("./routes/slots"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/stats", require("./routes/stats"));

module.exports = { app, PORT };
