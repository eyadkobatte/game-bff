const express = require('express');
const morgan = require('morgan');

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');

const app = express();

app.use(
  morgan('dev', {
    skip: (req) => req.statusCode < 400,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/profile', profileRouter);

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
