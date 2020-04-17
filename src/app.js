// Criar app.
const app = require('express')();

// Configurar porta do servidor.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const port = process.env.PORT || 8080;
app.set('port', port);

// Configurar CROS.
const cors = require('cors');
app.use(cors());

// Configurar Swagger.
require('./config/swagger/swagger')(app);

// Criar e iniciar o servidor.
const http = require('http')
const server = http.createServer(app);
server.listen(port);

console.debug(`SVD System API server running on port ${port}`)