const { Schema, model } = require("mongoose");

const MangaSchema = Schema({
	nivel: {
		type: String,
		required: [true, "El nivel es obligatorio"],
	},
	pasillo: {
		type: String,
		required: [true, "El pasillo es obligatorio"],
	},
	titulo: {
		type: String,
		required: [true, "El titulo es obligatorio"],
	},
	deposito: {
		type: String,
		required: [true, "El deposito es obligatorio"],
	},
	seccion: {
		type: String,
		required: [true, "La seccion es obligatoria"],
	},
	stock: {
		type: Boolean,
		required: [true, "El stock es obligatorio"],
		default: true,
	},
});

MangaSchema.methods.toJSON = function () {
	const { __v, _id, ...manga } = this.toObject();
	manga.id = _id;

	return manga;
};

module.exports = model("Manga", MangaSchema);
