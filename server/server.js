require("dotenv").config();
const app = require("./app");
require("./database");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
