require("dotenv").config();

const { PORT, MONGODB_URI, PASSWORD_TOKEN } = process.env;

module.exports = {
  PORT,
  MONGODB_URI,
  PASSWORD_TOKEN,
};
