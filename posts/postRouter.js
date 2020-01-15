const express = require("express");
const postDb = require("./postDb");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // do your magic!
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, async (req, res, next) => {
  // do your magic!
  const { id } = req.params;
  try {
    await postDb.getById(id);
    res.status(200).json(req.post);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validatePostId, async (req, res, next) => {
  // do your magic!
  try {
    const newPost = postDb.update(req.params.id, req.body);
    res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
});

// custom middleware

async function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  try {
    const isValidId = await postDb.getById(id);
    if (isValidId) {
      req.post = isValidId;
      next();
    } else {
      res.status(404).json({ message: `Not found` });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
