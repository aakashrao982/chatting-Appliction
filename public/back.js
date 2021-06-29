const http = require('http');
const fs = require('http');

var cors = require('cors');

app.use(cors({origin: 'http://localhost:8000'}));



const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('Hello Aakash');
})

server.listen(port, hostname, () => {
    console.log(`Server has been started at http://${hostname}:${port}/`);
  });