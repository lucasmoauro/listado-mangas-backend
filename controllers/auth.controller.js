const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generarJWT");

const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { TokenExpiredError } = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");

const userLogin = async (req, res = response) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(400).json({
				msg: "Usuario o Password no son correctos",
			});
		}

		const validPassword = bcryptjs.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(400).json({
				msg: "Usuario o Password no son correctos",
			});
		}

		const token = await generarJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		console.log(error, "auth");
		return res.status(500).json({
			msg: "Algo salio mal",
		});
	}
};

const userRegister = async (req, res) => {
	const { username, password } = req.body;
	const user = new User({ username, password });

	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);

	await user.save();

	res.status(201).json({
		user,
	});
};

const userRenew = (req, res) => {
	const { token } = req.headers;

	jwt.verify(token, process.env.SECRETORPRIVATEKEY, async (error, decode) => {
		if (!decode) {
			res.status(401).json({
				error,
				message: "El token es invalido/expiro.",
			});
		} else {
			const token = await generarJWT(decode.uid);
			res.status(200).json({
				token,
			});
		}
	});

};

module.exports = {
	userLogin,
	userRegister,
	userRenew,
};
