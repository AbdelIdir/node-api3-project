const express = require("express");

const router = express.Router();
const Posts = require("../posts/postDb");

router.get("/", (req, res) => {
  Posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        message: "error"
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
    .then(removedPost => {
      res.status(200).json(removedPost);
    })
    .catch(err => {
      res.status(400).json({ message: "issue" });
    });
});

router.put("/:id", validatePost, validatePostId, (req, res) => {
  // do your magic!
  // Posts.update(req.params.id, req.body)
  //   // console.log("put",req.body.name,"id",req.params.id)
  //   .then(editedPost => {
  //     res.status(200).json(editedPost);
  //   })
  //   .catch(err =>
  //     res.status(500).json({
  //       message: "something went wrong while trying to update the post"
  //     })
  //   );
  //  Posts.update(req.params.id, req.body)
  //    // console.log("put",req.body.name,"id",req.params.id)
  //    .then(editedUser => {
  //      res.status(200).json(editedUser);
  //    })
  //    .catch(err => console.log(err));
  res.status(200).json(req.body);
});

// custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
// }

function validatePost(req, res, next) {
  // do your magic!
  const postData = req.body;

  if (postData && postData.text && postData.user_id) {
    Posts.insert(postData)
      .then(newPost => {
        res.status(200).json(newPost);
      })
      .catch(err =>
        res
          .status(400)
          .json({
            message: "missing required valid text and valid user_id field "
          })
      );
    next();
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

function validatePostId(req, res, next) {
  const { id } = req.params;
  // console.log("validate ", id);

  Posts.getById(id)
    .then(post => {
      console.log(post);
      if (post) {
        // console.log("user ", typeof user);
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "invalid post id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
}

module.exports = router;
