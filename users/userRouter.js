const express = require("express");

const router = express.Router();

const Users = require("./userDb");
const Posts = require("../posts/postDb");
// const {validateUserId} = require("../server");
// const mw = require("../data/mw");
// server.use(express.json());

router.post("/", validateUser, (req, res) => {
  // do your magic!
  res.json(req.body);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  res.status(200).json(req.body);
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
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(post => {
      // console.log(post)
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "there was an error ,couldnt remove user " });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(removedPost => {
      res.status(200).json(removedPost);
    })
    .catch(err => {
      res.status(400).json({ message: "issue" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
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
  const userData = req.body;

  if (userData && userData.text && userData.user_id) {
    Posts.insert(req.body)
      .then(userPost => {
        next();
      })
      .catch(err => {
        res.status(500).json({
          message: "something went wrong while while trying to make a post"
        });
      });
    next();
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

module.exports = router;
