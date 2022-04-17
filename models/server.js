const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.database");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.mangasRoutes = "/api/mangas";
		this.authRoutes = "/api/auth";

		//Conexion a DB
		this.databaseCNN();

		//Middlewares
		this.middlewares();

		//Rutas de mi app
		this.routes();
	}

	async databaseCNN() {
		await dbConnection();
	}

	middlewares() {
		//CORS
		this.app.use(cors());

		this.app.use(express.json());

	}
	routes() {
		this.app.use(this.authRoutes, require("../routes/auth.routes"));
		this.app.use(this.mangasRoutes, require("../routes/mangas.routes"));
	}

	listen() {
		this.app.listen(this.port);
	}
}

module.exports = Server;
