const router = require("express").Router();
const cliniqueController = require("../controllers/clinique.controller");


router.get("/", cliniqueController.readClinique);
router.get("/:id", cliniqueController.infoClinique);
router.post("/", cliniqueController.createClinique);
router.put("/:id", cliniqueController.updateClinique);
router.delete("/:id", cliniqueController.deleteClinique);

module.exports = router;
