const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

export async function validateUserId(req, res, next) {
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

export function validateUser(req, res, next) {
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

export function validatePost(req, res, next) {
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
