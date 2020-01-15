const express = require("express");
const helmet = require("helmet");
const server = express();

server.use(express.json());

server.use(helmet());


server.use( logger)


server.get("/", (req, res, ) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
var moment = require("moment");
moment().format();

function logger(req, res, next) {
  console.log(
    `Request method: ${req.method} | Url:  /4500${req.url} | Date: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`
  );
  next();
}

// server.get("*", (req, res) => {
//   res.json("something is happening");
// });

module.exports = server;
