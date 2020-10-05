const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/testDb';

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});

mongoose.connection.once( 'open', () => {
	console.log('Database is connected to', uri)
});

mongoose.connection.on( 'error', (error) => {
	console.log(error)
});
