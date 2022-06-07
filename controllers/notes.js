const Note = require("../models/note");
const User = require("../models/user");
const { PASSWORD_TOKEN } = require("../utils/config");
const { verify } = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const createNote = async (request, response, next) => {
  const { content, impotant } = request.body;
  const token = getTokenFrom(request);
  const decodedToken = token && verify(token, PASSWORD_TOKEN);
  if (!decodedToken?.id) {
    return response
      .status(401)
      .send({ status: 401, message: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const note = new Note({
    content,
    impotant: impotant || false,
    date: new Date(),
    user: user._id,
  });
  const addedNote = await note.save();
  user.notes = user.notes.concat(addedNote._id);
  await user.save();
  response.json(addedNote);
};

const deleteNote = (request, response, next) => {
  const { id } = request.params;
  Note.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
};

const updateNote = (request, response, next) => {
  const { content, important } = request.body;
  const { id } = request.params;
  const note = {
    content,
    important,
  };
  Note.findByIdAndUpdate(id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
};

const getNote = (request, response, next) => {
  const { id } = request.params;
  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response
          .status(404)
          .send({ status: 404, message: "note not found with this id" });
      }
    })
    .catch((error) => next(error));
};

const getNotes = (_, response, next) => {
  Note.find({})
    .populate("user", { userName: 1, name: 1 })
    .then((notes) => {
      response.json(notes);
    })
    .catch((error) => next(error));
};

module.exports = {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
};
