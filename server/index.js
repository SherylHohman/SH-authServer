// main starting point of application (back end)
const express = require('express');
const http = require('http');       // from node
const bodyParser = require('body-parser');
const morgan = require('morgan');  // server logging framework

// App Setup
const app = express();
const router = require('./router');

// middleware for express:
  // all requests first go through morgan and bodyParser.
  // register middleware with express via app.use
  // (app === our express server instance)

  // logs all incomimg requests to console, useful for debugging
app.use(morgan('combined'));

  // parses all incoming requests into json (tries to anyway)
app.use(bodyParser.json({ type: '*/*' }));

// call our routing file with our express server
// this function defines, intercepts, and "routes" get/put requests
// to the functions we define for each get/put/.. "route" we define.
router(app);

// Server  Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Express Server listening on: ' + port);