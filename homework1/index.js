const http = require('http');
const url = require('url');

const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const method = req.method.toUpperCase();

    if(method == 'POST' && path == '/hello') {
        res.setHeader('Content-Type', 'application/json');
        const payload = { what_is_this: 'First HW from pirple' };
        const payloadString = JSON.stringify(payload);
        res.end(payloadString);
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(3000, function() {
    console.log("API is listening to port 3000 now.");
});

