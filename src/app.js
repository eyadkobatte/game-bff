const express = require('express');
const morgan = require('morgan');

const logger = require('./logger');

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const gameRouter = require('./routes/game');

const app = express();

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms', {
    skip: (req, res) => res.statusCode < 400,
    stream: {
      write: (str) => {
        logger.debug({ message: str });
      },
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/game', gameRouter);

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
