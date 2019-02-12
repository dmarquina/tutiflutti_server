var express = require('express');
var router = express.Router();
const UserService = require("../services/user_service");

const userService = new UserService();
/* GET home page. */
router.get("/", async function (req, res, next) {
  const { tags } = req.query;

  console.log("req", req.query);

  try {
    const users = await userService.getUsers({ tags });

    res.status(200).json({
      data: users,
      message: "users listed"
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async function(req, res, next) {
  const { body: user } = req;

  console.log("req", req.body);

  try {
    const createdUser = await userService.createUser({ user });

    res.status(201).json({
      data: createdUser,
      message: "user created"
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
