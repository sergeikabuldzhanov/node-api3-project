const express = require("express");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, async (req, res, next) => {
  // do your magic!
  const newUserData = req.body;
  try {
    const newUser = await userDb.insert(newUserData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/posts",
  validateUserId,
  validatePost,
  async (req, res, next) => {
    // do your magic!
    const user_id = req.params.id;
    const text = req.body;
    try {
      const newPost = await postDb.insert({ text, user_id });
      res.status(200).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req, res, next) => {
  // do your magic!
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateUserId,  (req, res, next) => {
  // do your magic!
    res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
  // do your magic!
  const { id } = req.params;
  try {
    const posts = postDb.get();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  // do your magic!
  const { id } = req.params;
  try {
    const numOfDeletedRecords = await userDb.remove(id);
    res.status(200).json(numOfDeletedRecords);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res, next) => {
  // do your magic!
  const { id } = req.params;
  const userUpdateData = req.body;
  try {
    const updated = await userDb.update(id, userUpdateData);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;
  try {
    const isValidId = await userDb.getById(id);
    if (isValidId) {
      req.user = isValidId;
      next();
    } else {
      res.status(404).json({ message: `Not found` });
    }
  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      req.status.json({ message: "missing required name field" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  if (req.body) {
    if (req.body.text) {
      next();
    } else {
      req.status(400).json({ message: "missing required text field" });
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

module.exports = router;
