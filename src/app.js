const app = require('express')();
const http = require('http')
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Success: SVD System API server running!')
});

const port = process.env.PORT || 8080;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

console.debug(`SVD System API server running on port ${port}`)