const { Router } = require("express");
const genresRouter = Router();
const { getGenres } = require("../controllers/genreController");

genresRouter.get("/", getGenres);

module.exports = genresRouter;
