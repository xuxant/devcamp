const mongoose = require('mongoose');
require('colors');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`Mongodb Connected: ${conn.connection.host}`.yellow);
};

module.exports = connectDB;
