const NoteModel = require("../models/note.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readNote = (req, res) => {
  NoteModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data :" + err);
  }).sort({ createdAt: -1 });
};

module.exports.noteInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id)

    NoteModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select('-password');
};

module.exports.createNote = async (req, res) => {
  const newNote = new NoteModel({
    userNote: req.body.userNote,
    raceId: req.body.raceId,
    message: req.body.message,
    isDone: req.body.isDone,
    tag: req.body.tag,
    date: req.body.date,
    hour: req.body.hour
  });

  try {
    const note = await newNote.save();
    return res.status(201).json(note);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.updateNote = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  const updatedRecord = {
    message: req.body.message,
    isDone: req.body.isDone,
    tag: req.body.tag,
    raceId: req.body.raceId
  };

  NoteModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true }
  )
    .then((docs) => res.send(docs))
    .catch((err) => console.log("Update error" + err));
};

module.exports.deleteNote = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  NoteModel.findByIdAndDelete(req.params.id)
    .then((docs) => res.send(docs))
    .catch((err) => console.log(err));
};
