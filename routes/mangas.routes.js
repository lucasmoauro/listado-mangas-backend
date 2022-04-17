const { Router } = require("express");
const { param, body } = require("express-validator");
const {
	mangasGet,
	mangaGet,
	mangaDelete,
	mangaPut,
	mangaPost,
	mangaPatch,
} = require("../controllers/mangas.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validarJWT");

const router = Router();

//Trae todos los mangas
router.get("/", mangasGet);

//Crea un manga
router.post(
	"/",
	[
		validarJWT,
		body("titulo", "El titulo es obligatorio").not().isEmpty(),
		body("nivel", "El nivel es obligatorio").not().isEmpty(),
		body("deposito", "El deposito es obligatorio").not().isEmpty(),
		body("pasillo", "El pasillo es obligatorio").not().isEmpty(),
		body("seccion", "La seccion es obligatoria").not().isEmpty(),
		body("stock", "El stock es obligatoria").not().isEmpty(),
		validarCampos,
	],
	mangaPost
);

//Trae un solo manga
router.get(
	"/:id",
	[param("id").not().isEmpty(), param("id").isMongoId(), validarCampos],
	mangaGet
);

//Actualiza un manga
router.put(
	"/:id",
	[
		validarJWT,
		param("id", "El id es obligatorio").not().isEmpty(),
		param("id", "No es un id valido").isMongoId(),
		body("titulo", "El titulo es obligatorio").not().isEmpty(),
		body("nivel", "El nivel es obligatorio").not().isEmpty(),
		body("deposito", "El deposito es obligatorio").not().isEmpty(),
		body("pasillo", "El pasillo es obligatorio").not().isEmpty(),
		body("seccion", "La seccion es obligatoria").not().isEmpty(),
		validarCampos,
	],
	mangaPut
);

router.patch(
	"/:id",
	[
		validarJWT,
		param("id", "El id es obligatorio").not().isEmpty(),
		param("id", "No es un id valido").isMongoId(),
		body("stock", "El stock es obligatorio").not().isEmpty(),
		body("stock", "El stock debe tener valor boolean").isBoolean(),
		validarCampos,
	],
	mangaPatch
);

//Elimina un manga
router.delete(
	"/:id",
	[
		validarJWT,
		param("id").not().isEmpty(),
		param("id").isMongoId(),
		validarCampos,
	],
	mangaDelete
);

module.exports = router;
