const { Router } = require("express");
const videogamesRouter = Router();
const {
  getVideogames,
  newVideogame,
  getGameById,
} = require("../controllers/videogamesController");
const { validateVideogame } = require("../middlewares/index.js"); //tambien validado en models pero hace falta 2 veces o 3 con el front incluido

videogamesRouter.get("/", getVideogames);
videogamesRouter.get("/:id", getGameById);
videogamesRouter.post("/", newVideogame, validateVideogame);

module.exports = videogamesRouter;
