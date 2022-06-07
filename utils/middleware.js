const { info, error: logError } = require("./logger");

const requestLogger = (request, _, next) => {
  info("Method:", request.method);
  info("Path:  ", request.path);
  info("Body:  ", request.body);
  info("Params:", request.params);
  info("---");
  next();
};

const unknownEndpoint = (_, response) => {
  response.status(404).send({ status: 404, message: "unknown endpoint" });
};

const errorHandler = (error, _, response, next) => {
  logError(error.message);

  if (error.name === "CastError") {
    return response
      .status(400)
      .send({ error: 400, message: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: 400, message: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response
      .status(401)
      .send({ error: 401, message: "missing or invalid token" });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
