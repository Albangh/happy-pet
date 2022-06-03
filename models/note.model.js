const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userNote: {
      type: String,
      required: true,
    },
    raceId: {
      type: String
    },
    message: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
    },
    hour: {
      type: String,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("note", noteSchema);
