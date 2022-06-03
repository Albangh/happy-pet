const router = require("express").Router();
const animalController = require("../controllers/animal.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();

router.get("/", animalController.readAnimal);
router.get("/:id", animalController.animalInfo);
router.post("/", animalController.createAnimal);
router.put("/:id", animalController.updateAnimal);
router.delete("/:id", animalController.deleteAnimal);

router.post('/upload', upload.single('file'), uploadController.uploadAnimal);

module.exports = router;
