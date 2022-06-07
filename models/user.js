const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_, returnedData) => {
    returnedData.id = returnedData._id;
    delete returnedData.__v;
    delete returnedData._id;
    delete returnedData.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
