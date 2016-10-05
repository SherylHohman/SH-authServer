// main starting point of application (back end)
const express = require('express');
const http = require('http');       // from node
const bodyParser = require('body-parser');
const morgan = require('morgan');  // server logging framework

// App Setup
const app = express();
// middleware for express: 
// all requests first go through morgan and bodyParser. 
// register them with express via app.use (app === express instance)

// logs all incomimg requests to console, useful for debugging
app.use(morgan('combined'));

// parses all incoming requests into json (tries to anyway)
app.use(bodyParser.json({ type: '*/*' }));

// Server  Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Express Server listening on: ' + port);