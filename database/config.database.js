const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB);

	} catch (error) {
		console.log("--->", error);
		throw new Error("Error al iniciar la DB.");
	}
};

module.exports = {
	dbConnection,
};
