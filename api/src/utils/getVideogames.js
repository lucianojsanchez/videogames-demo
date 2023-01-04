const axios = require("axios");
require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db.js");

const getApiVideogames = async () => {
  const apiGames = [];
  let index = 1;
  while (apiGames.length < 100) {
    // de aqui manejo la cantidad de juegos que quiero por request
    const requests = await axios.get(
      `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page_size=15&page=${index}`, // si pongo pagesize en 15 me vienen 6 juegos de más me vienen juegos de más
      {
        headers: {
          "accept-encoding": "*",
        },
      }
    );
    requests.data.results.forEach((el) => {
      apiGames.push({
        id: el.id,
        name: el.name,
        image: el.background_image,
        rating: el.rating,
        released: el.released,
        genres: el.genres.map((el) => el.name),
        platforms: el.platforms.map((el) => el.platform.name),
        origin: "api",
      });
    });
    index++;
  }
  return apiGames;
};

const getDbVideogames = async () => {
  return await Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};
const getAllVideogames = async () => {
  const dbVideogames = await getDbVideogames();
  const apiVideogames = await getApiVideogames();
  const infoTotal = apiVideogames.concat(dbVideogames);
  return infoTotal;
};

module.exports = { getAllVideogames };
