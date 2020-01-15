// code away!
//Import dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//Import routers
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

//Custom middleware
//Logger
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  next();
}
//Error handler
function dbErrorHandler(error, req,res,next) {
    res.status(500).json(error.message);
}
//Create server
const server = express();

//Setup global middleware
server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('/users/:id/posts', postRouter);
server.use('/users', userRouter);
server.use(dbErrorHandler);

server.listen(5000, () => {
  console.log(`Listening on port 5000`);
});
