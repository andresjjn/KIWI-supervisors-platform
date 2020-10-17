const mongoose = require('mongoose');

//'mongodb://localhost/kiwi_db_v1'
const localURI = 'mongodb+srv://kiwi:theProblemSolvers@cluster0.cc17b.gcp.mongodb.net/kiwi_db_v1?retryWrites=true&w=majority';
const URI = process.env.MONGODB_URI || localURI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log(`MongoDB Connected to ${URI}`))
  .catch((err) => console.log(err));
