const express = require('express');
const fileupload = require('express-fileupload');
const path = require('path');
require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./db/db');
// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

connectDB();
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(fileupload());

// Sanitize the data
app.use(mongoSanitize);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount router
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/auth/users', users);
app.use('/api/v1/reviews', reviews);
app.use(errorHandler);
const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.red
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
