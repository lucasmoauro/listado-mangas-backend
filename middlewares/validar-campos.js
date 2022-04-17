const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
	//ValidationResult arroja todos los errores "acumulados" en el middleware de
	//la ruta antes de ejecutar el controlador.
	//Se pueden observar como esta escrito en el ejemplo de abajo
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors,
		});
	}

	//La fn next permite continuar con el siguiente middleware, en caso de no haber
	// otro middleware entonces ejecuta el controlador.
	next();
};

module.exports = {
	validarCampos,
};
