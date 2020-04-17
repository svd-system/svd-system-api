const app = require('express')();
const http = require('http')
const cors = require('cors');

app.use(cors());

const port = process.env.PORT || 8080;
app.set('port', port);

require('./config/swagger/swagger')(app);

const server = http.createServer(app);
server.listen(port);

console.debug(`SVD System API server running on port ${port}`)