const usersRouter = require('./user');
const loginRouter = require('./login');

module.exports = (app) => {
  app.use('/api/users', usersRouter);
  app.use('/api/login', loginRouter);
};
