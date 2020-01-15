const express = require("express");

const router = express.Router();

const Users = require("./userDb");
// const {validateUserId} = require("../server");
// const mw = require("../data/mw");
// server.use(express.json());

router.post("/", validateUser, (req, res) => {
  // do your magic!
  res.json(req.body);
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: error
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json("well done");
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    // console.log("put",req.body.name,"id",req.params.id)
    .then(editedUser => {
      res.status(200).json(editedUser);
    })
    .catch(err => console.log(err));
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  console.log("validate ", id);

  Users.getById(id)
    .then(user => {
      console.log(user);
      if (user) {
        // console.log("user ", typeof user);
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  const userData = req.body;

  if (userData && userData.name) {
    Users.insert(userData)
      .then(newUser => {
        res.status(200).json(newUser);
      })
      .catch(err =>
        res.status(400).json({ message: "missing required name field " })
      );
    next();
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
