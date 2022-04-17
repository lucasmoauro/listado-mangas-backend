const { Router } = require("express");
const { check } = require("express-validator");
const {
	userLogin,
	userRegister,
	userRenew,
} = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/login", userLogin);

router.post("/renew", userRenew);

router.post(
	"/register",
	[
		check("username", "El nombre es obligatorio").not().isEmpty(),
		check("password", "El password es obligatorio y mas de 6 letras").isLength({
			min: 6,
		}),
		validarCampos,
	],
	userRegister
);

module.exports = router;
