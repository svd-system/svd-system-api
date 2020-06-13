const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDefinition.json');

const swaggerDocs = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./docs/*.yaml'],
});

module.exports = (app) => {
  app.use('/api/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
