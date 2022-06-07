const {
  getNotes,
  getNote,
  updateNote,
  createNote,
  deleteNote,
} = require("../controllers/notes");

const notesRouter = require("express").Router();

notesRouter.get("/", getNotes);
notesRouter.get("/:id", getNote);
notesRouter.delete("/:id", deleteNote);
notesRouter.post("/", createNote);
notesRouter.put("/:id", updateNote);

module.exports = notesRouter;
