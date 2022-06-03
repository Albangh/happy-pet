const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true
    },
    name: {
      type: String,
      trim: true,
      maxlength: 500,
      required: true
    },
    whatType: {
      type: String,
      trim: true,
      required: true
    },
    breed: {
      type: String,
      trim: true,
      required: true
    },
    race: {
      type: String,
      required: true
    },
    weight: {
      type: String,
      trim: true,
      required: true
    },
    blood: {
      type: String,
      trim: true,
    },
    tatoo: {
      type: Boolean,
      required: true
    },
    picture: {
      type: String,
      default: "./uploads/animal/random-animal.svg"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('animal', animalSchema);