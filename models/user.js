const { Schema, model } = require("mongoose");

//Esto es un ejemplo que usa mongoose al momento de crear la coleccion en la DB
const UserSchema = Schema({
	username: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},

	password: {
		type: String,
		required: [true, "La contraseña es obligatoria"],
	},
});

UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.id = _id;

	return user;
};

module.exports = model("User", UserSchema);
