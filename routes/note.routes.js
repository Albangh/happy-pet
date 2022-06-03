const router = require("express").Router();
const noteController = require("../controllers/note.controller");


router.get("/", noteController.readNote);
router.post("/", noteController.createNote);
router.get("/:id", noteController.noteInfo);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
