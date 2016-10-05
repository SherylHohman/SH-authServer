// main starting point of application (back end)
const express = require('express');
const http = require('http');       // from node

// App Setup
const app = express();

// Server  Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Express Server listening on: ' + port);