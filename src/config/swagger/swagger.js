const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

module.exports = (app) => {
  app.use('/api/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  app.get('*', (req, res) => res.redirect('/api/swagger-ui'));
};
