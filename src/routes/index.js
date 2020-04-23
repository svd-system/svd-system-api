const usersRouter = require('./user');

module.exports = (app) => {
  app.use('/api/users', usersRouter);
};
