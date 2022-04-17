const Role = require("../models/role");
const User = require("../models/user");

const esRoleValido = async (role = "") => {
	const existeRole = await Role.findOne({ role });
	if (!existeRole) {
		throw new Error(`El role ${role} no esta registrado en la DB.`);
	}
};

//TODO: El throw new Error permite a express validator manejar los errores en caso de haberlo

const emailExiste = async (email = "") => {
	const existeEmail = await User.findOne({ email });

	if (existeEmail) {
		throw new Error(`El email ${email} ya existe.`);
	}
};

const existeUsuarioPorId = async (id) => {
	const existeUsuario = await User.findById(id);
	if (!existeUsuario) {
		throw new Error(`El id ${id} no existe`);
	}
};

module.exports = {
	esRoleValido,
	emailExiste,
	existeUsuarioPorId
};
