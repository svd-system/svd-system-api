const usersRouter = require('./user');
const loginRouter = require('./login');

module.exports = (app) => {
  // Mapeamento das rotas para os recursos da API.
  app.use('/api/login', loginRouter);
  app.use('/api/users', usersRouter);

  // Redirecionar requisições não mapeadas para a página do Swagger.
  app.get('*', (req, res) => res.redirect('/api/swagger-ui'));
};
