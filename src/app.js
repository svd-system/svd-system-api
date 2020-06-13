const app = require('express')();
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

if (process.env.NODE_ENV !== 'production') {
  // Configurar porta do servidor e log.
  dotenv.config();
}

const port = process.env.PORT || 8080;
app.set('port', port);

// Configurar CROS e body parser.
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Configurar Swagger.
require('./config/swagger/swagger')(app);

// Definir rotas.
require('./routes/index')(app);

// Criar e iniciar o servidor.
const server = http.createServer(app);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.debug(
    `Mode: ${process.env.NODE_ENV}\nSVD System API server running on port ${port}`
  );
});
