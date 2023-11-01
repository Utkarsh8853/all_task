const http = require('http');
//const server = http.createServer()
http.createServer((req, res) => {
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(3001);