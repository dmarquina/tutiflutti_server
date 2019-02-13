var express = require('express');
var router = express.Router();
const UserService = require("../services/user_service");

const userService = new UserService();

router.get("/", async function (req, res, next) {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      data: users,
      message: "users listed"
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:username", async function (req, res, next) {
  const { username } = req.params;

  try {
    const user = await userService.getUserByUsername({ username });
    res.status(200).json({
      data: user,
      message: "user found"
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async function(req, res, next) {
  const { body: newUser } = req;

  try {
    const createdUser = await userService.createUser({ newUser });

    res.status(201).json({
      data: createdUser,
      message: "user created"
    });
  } catch (err) {
    res.status(err.code).json({
      message: err.message
    });
  }
});

module.exports = router;
