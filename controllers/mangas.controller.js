const { request } = require("express");
const { response } = require("express");

const Manga = require("../models/manga");

//FN que trae todos los mangas de la DB
const mangasGet = async (req, res = response) => {
	const mangas = await Manga.find();

	res.status(200).json({
		mangas,
	});
};

//FN que trae un solo manga de la DB
const mangaGet = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const manga = await Manga.findById(id);

		res.status(200).json({
			manga,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: false,
			msg: "Manga invalido",
		});
	}
};

//FN que crea un manga de la DB
const mangaPost = async (req = request, res = response) => {
	try {
		const newManga = req.body;

		const manga = new Manga(newManga);

		await manga.save();

		res.status(201).json({
			manga,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: false,
			msg: "Manga invalido",
		});
	}
};

//FN que actualiza un solo manga de la DB
const mangaPut = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const { _id, stock, ...rest } = req.body;

		const manga = await Manga.findByIdAndUpdate(id, rest);

		res.status(200).json({
			manga,
		});
	} catch (error) {
		console.log(error);

		res.status(400).json({
			msg: "Manga no actualizado",
		});
	}
};

//FN que actualiza solamente el stock del manga
const mangaPatch = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const { stock } = req.body;

		const manga = await Manga.findByIdAndUpdate(id, { stock });

		res.status(200).json({
			manga,
		});
	} catch (error) {
		console.log(error);

		res.status(401).json({
			msg: "Manga invalido",
		});
	}
};

//FN que elimina un manga de la DB
const mangaDelete = async (req = request, res = response) => {
	try {
		const { id } = req.params;

		const manga = await Manga.findByIdAndRemove(id);

		res.json({
			manga,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: false,
			msg: "Manga invalido",
		});
	}
};

module.exports = {
	mangasGet,
	mangaGet,
	mangaDelete,
	mangaPut,
	mangaPost,
	mangaPatch,
};
