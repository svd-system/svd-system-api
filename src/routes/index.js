const usersRouter = require('./user');
const loginRouter = require('./login');
const vaccinesRouter = require('./vaccine');
const vaccinationRecordRouter = require('./vaccination-record');
const newsfeedRouter = require('./newsfeed');

module.exports = (app) => {
  // Mapeamento das rotas para os recursos da API.
  app.use('/api/login', loginRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/vaccines', vaccinesRouter);
  app.use('/api/vaccinations', vaccinationRecordRouter);
  app.use('/api/newsfeed', newsfeedRouter);

  // Redirecionar requisições não mapeadas para a página do Swagger.
  app.get('*', (req, res) => res.redirect('/api/swagger-ui'));
};
