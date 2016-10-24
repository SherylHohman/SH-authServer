// main starting point of application (back end)
const express = require('express');
const http = require('http');       // from node
const bodyParser = require('body-parser');
const morgan = require('morgan');  // server logging framework

// App Setup
const app = express();
const router = require('./router');

// middleware for express:
  // register middleware with express via "app.use"
  // pass the middleware as a param on the "express.use" function.
  // (app === our express server instance)
  // we'll send all requests through: morgan and bodyParser, before sending them to our app

  // logs all incomimg requests to console, useful for debugging
app.use(morgan('combined'));

  // parses all incoming requests into json (tries to anyway)
app.use(bodyParser.json({ type: '*/*' }));

// routing for express:
  // call our router function (router.js)
  // passing our express server (app) to it
  // router function defines, intercepts, and "routes" get/put requests
  // to the functions we define
  // for each get/put/.. "route" we define.
router(app);


// Server  Setup:
const port = process.env.PORT || 3090;

// create an instance of an http server
  // instance of express named as "app"
// http is a native node library for handling incoming http requests
  // forwards (server) requests, to our (express)application
const server = http.createServer(app);

server.listen(port);
console.log('Express Server listening on: ' + port);
