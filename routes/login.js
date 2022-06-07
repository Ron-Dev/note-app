const { signIn } = require("../controllers/login");
const loginRouter = require("express").Router();

loginRouter.post("/", signIn);

module.exports = loginRouter;
