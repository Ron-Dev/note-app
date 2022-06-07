const { MONGODB_URI } = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { info, error: logError } = require("./utils/logger");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");
const routeConfig = require("./routes");
const app = express();

info(`connecting to URL-${MONGODB_URI}`);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    logError("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);

routeConfig.map((item) => app.use(item.path, item.route));

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
