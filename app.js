//Core Modules
const path = require('path');

//Third Party Module
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');

// Own Modules
const sectionRouter = require('./routes/sectionPagesRoutes');
const blogRouter = require('./routes/blogRoute');
const viewRouter = require('./routes/viewRoutes');
const officeRouter = require('./routes/officeRoute');
const userRouter = require('./routes/userRoutes');
const musicRouter = require('./routes/musicRoute');
const bookingRouter = require('./routes/bookingRoutes');
const directorRouter = require('./routes/directorRoute');
const queryRouter = require('./routes/queryRoute');
const releasesRouter = require('./routes/sectionReleasesRoute');
const landingRouter = require('./routes/landingRoute');


const globalErrorHandler = require('./controllers//errorController');
const AppError = require('./utils/appError');
const billRouter = require('./routes/billingRoute');

// Start Express App
const app = express();

//Setting up our view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving Static Files
app.use(express.static(path.join(__dirname, '/public')));

// Set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser middleware
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//for development only now
app.use(compression());

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/sections', sectionRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/office', officeRouter);
app.use('/api/v1/music', musicRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/billing', billRouter);
app.use('/api/v1/director', directorRouter);
app.use('/api/v1/query', queryRouter);
app.use('/api/v1/releases', releasesRouter);
app.use('/api/v1/landing', landingRouter);


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
