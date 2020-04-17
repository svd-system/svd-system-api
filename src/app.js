const app = require('express')();
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');

if (process.env.NODE_ENV !== 'production') {
  // Configurar porta do servidor e log.
  dotenv.config();
}

const port = process.env.PORT || 8080;
app.set('port', port);

// Configurar CROS.
app.use(cors());

// Configurar Swagger.
require('./config/swagger/swagger')(app);

// Criar e iniciar o servidor.
const server = http.createServer(app);
server.listen(port, () => {
  console.debug(`SVD System API server running on port ${port}`);
});
