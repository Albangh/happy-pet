const AnimalModel = require("../models/animal.model");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.readAnimal = (req, res) => {
  AnimalModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data :" + err);
  }).sort({ createdAt: -1 });
};

module.exports.animalInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id)

    AnimalModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select('-password');
};

module.exports.createAnimal = async (req, res) => {

  const newAnimal = new AnimalModel({
    userID: req.body.userID,
    name: req.body.name,
    whatType: req.body.whatType,
    breed: req.body.breed,
    weight: req.body.weight,
    race: req.body.race,
    blood: req.body.blood,
    tatoo: req.body.tatoo,

  });

  try {
    const animal = await newAnimal.save();
    return res.status(201).json(animal);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.updateAnimal = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

    try {
      await AnimalModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            weight: req.body.weight,
            blood: req.body.blood,
            tatoo: req.body.tatoo,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
      return res.status(500).json({ message: err });
    }
};

module.exports.deleteAnimal = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  AnimalModel.findByIdAndDelete(req.params.id)
    .then((docs) => res.send(docs))
    .catch((err) => console.log(err));
};
