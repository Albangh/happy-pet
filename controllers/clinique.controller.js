const CliniqueModel = require("../models/clinique.model");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.readClinique = (req, res) => {
   CliniqueModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data :" + err);
  }).sort({ createdAt: -1 });
};

module.exports.infoClinique = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id)

    CliniqueModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select('-password');
};

module.exports.createClinique = async (req, res) => {

  const newClinique = new CliniqueModel({
    cliniqueId: req.body.cliniqueId,
    adress: req.body.adress,
    name: req.body.name,
    city: req.body.city,
    zipCode: req.body.zipCode,
    phone: req.body.phone
  });

  try {
    const clinique = await newClinique.save();
    return res.status(201).json(clinique);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.updateClinique = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  const updatedRecord = {
    adress: req.body.adress,
    name: req.body.name,
    city: req.body.city,
    zipCode: req.body.zipCode,
    phone: req.body.phone
  };

  CliniqueModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true }
  )
    .then((docs) => res.send(docs))
    .catch((err) => console.log("Update error" + err));
};

module.exports.deleteClinique = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

    CliniqueModel.findByIdAndDelete(req.params.id)
    .then((docs) => res.send(docs))
    .catch((err) => console.log(err));
};
