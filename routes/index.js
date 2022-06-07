const notesRouter = require("./notes");
const userRouter = require("./users");
const loginRouter = require("./login");

const routeConfig = [
  {
    path: "/api/notes",
    route: notesRouter,
  },
  {
    path: "/api/users",
    route: userRouter,
  },
  {
    path: "/api/login",
    route: loginRouter,
  },
];
module.exports = routeConfig;
