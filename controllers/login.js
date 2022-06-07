const User = require('../models/user');
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { PASSWORD_TOKEN } = require('../utils/config');

const signIn = async (request, response) => {
  const { userName, password } = request.body;
  const dbUser = await User.findOne({ userName });
  const isValidPassword =
    dbUser && (await compare(password, dbUser.passwordHash));
  if (!(dbUser && isValidPassword)) {
    return response
      .status(401)
      .send({ status: 401, message: 'invalid username or password' });
  }

  const userForToken = {
    userName: dbUser.userName,
    id: dbUser._id,
  };
  const token = sign(userForToken, PASSWORD_TOKEN);
  response.send({ token, userName: dbUser.userName, name: dbUser.name });
};

module.exports = { signIn };
