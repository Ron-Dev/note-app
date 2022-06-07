const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (request, response) => {
  const { userName, name, password } = request.body;
  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    return response.status(400).send({
      status: 400,
      message: "Username must be unique",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    userName,
    passwordHash,
  });
  const addedUser = await user.save();
  response.status(201).json(addedUser);
};

const getUsers = async (_, response) => {
  const users = User.find({}).populate("notes", { content: 1, date: 1 });
  response.json(users);
};

module.exports = { createUser, getUsers };
