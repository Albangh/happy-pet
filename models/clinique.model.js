const mongoose = require("mongoose");

const cliniqueSchema = new mongoose.Schema(
  {
    cliniqueId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    adress: {
      type: String,
      max: 1024,
    },
    city: {
      type: String,
      max: 1024,
    },
    zipCode: {
      type: String,
      max: 1024,
    },
    phone: {
      type: String,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("clinique", cliniqueSchema);
