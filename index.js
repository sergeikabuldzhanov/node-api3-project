// code away!
//Import dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//Custom middleware
export function logger(req, res, next) {
    console.log(`${req.method} ${req.url} ${+new Date()}`);
    next();
  }
//Create server
const server = express();

//Setup global middleware
server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(logger);
