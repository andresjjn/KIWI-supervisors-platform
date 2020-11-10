require('dotenv').config();

require('./database');
const { app, PORT } = require('./app');

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
