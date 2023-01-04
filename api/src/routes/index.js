const { Router } = require("express");
const genreRouter = require("./genresRouter.js");
const videogamesRouter = require("./videogamesRouter.js");
const platformsRouter = require("./platformsRouter.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/genres", genreRouter);
router.use("/videogames", videogamesRouter);
router.use("/platforms", platformsRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
