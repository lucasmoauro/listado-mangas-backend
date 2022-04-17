const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
	const token = req.header("token");

	if (!token) {
		console.log(token);
		return res.status(400).json({
			msg: "No hay token en la peticion",
		});
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

		req.uid = uid;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: "Token no valido",
		});
	}
};

module.exports = {
	validarJWT,
};
