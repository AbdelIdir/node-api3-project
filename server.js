const express = require("express");
const helmet = require("helmet");
const server = express();
const userRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");
const Users = require("./users/userDb");

server.use(express.json());

server.use(helmet());

server.use(logger);

// server.use("/api/users", userRouter);

server.use("/api/posts", postsRouter);

// server.get("/", (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

//custom middleware
var moment = require("moment");
moment().format();

function logger(req, res, next) {
  console.log(
    `Request method: ${req.method} | Url:  /4500${
      req.url
    } | Date: ${moment().format("MMMM Do YYYY, h:mm:ss a")}`
  );
  next();
}

server.use("/api/users", userRouter);

// server.get("*", (req, res) => {
//   res.json("something is happening");
// });

module.exports = server;
