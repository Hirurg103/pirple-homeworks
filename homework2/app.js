const http = require('http');
const router = require('./lib/router');

const server = http.createServer(router);

server.listen(3000, function() {
  console.log("App is not listening to port 3000");
});
