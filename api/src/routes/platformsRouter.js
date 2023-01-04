const { Router } = require("express");
const platformsRouter = Router();
const { getPlatforms } = require("../controllers/platformsController.js");

platformsRouter.get("/", getPlatforms);

module.exports = platformsRouter;
