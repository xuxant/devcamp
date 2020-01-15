const express = require('express');
require('color');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./db/db');
// Route files
const bootcamps = require('./routes/bootcamps');

connectDB();
const app = express();

// Body parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount router
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);
const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handele unhandled promise rejection

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
