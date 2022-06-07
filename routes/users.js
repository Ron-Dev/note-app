const { createUser, getUsers } = require("../controllers/users");
const userRouter = require("express").Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);

module.exports = userRouter;
