const { getAllVideogames } = require("../utils/getVideogames");
const { Genre, Videogame, Platform } = require("../db.js");
const axios = require("axios");
require("dotenv").config();
const { YOUR_API_KEY } = process.env;

const getVideogames = async (req, res) => {
  const { name } = req.query;
  let gamesTotal = await getAllVideogames();
  try {
    if (name) {
      let gameName = gamesTotal.filter((videogame) =>
        videogame.name.toLowerCase().includes(name.toLowerCase())
      );
      gameName.length
        ? res.status(200).json(gameName)
        : res.status(400).json({ msg: "Game not found!" });
    } else {
      res.status(200).json(gamesTotal);
    }
  } catch (error) {
    res.status(400).json({ error: "error.message" });
  }
};

const getGameById = async (req, res) => {
  const { id } = req.params;
  const apiGamesTotal = await getAllVideogames();
  try {
    if (!id.includes("-")) {
      let gameId = apiGamesTotal.filter((el) => el.id == id);
      gameId.length
        ? res.status(200).json(gameId)
        : res.status(400).send("GAME ");
    } else {
      let gameDb = await Videogame.findByPk(id, {
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
      let toString = []; //array para que matchee con los de mi api y me traiga los datos correctos en la request
      toString.push(gameDb);
      toString.length
        ? res.status(200).json(toString)
        : res.status(400).send("GAME NOT FOUND ON OUR DATABASE");
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const newVideogame = async (req, res) => {
  const {
    name,
    image,
    description,
    released,
    rating,
    genres,
    platforms,
    createdAtDB,
  } = req.body;
  try {
    let newGame = await Videogame.create({
      name,
      image,
      description,
      released,
      rating,
      createdAtDB,
    });

    let genreDb = await Genre.findAll({
      where: {
        name: genres,
      },
    });

    let platformDb = await Platform.findAll({
      where: {
        name: platforms,
      },
    });

    newGame.addGenres(genreDb);

    newGame.addPlatforms(platformDb);

    res.status(200).send("Videogame successfully created");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVideogames,
  newVideogame,
  getGameById,
};

// const getGameById = async (req, res) => {
//   const { id } = req.params;
//   if (!id.includes("-")) {
//     const gameId = await axios.get(
//       `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`,
//       {
//         headers: {
//           "accept-encoding": "*",
//         },
//       }
//     );
//     const el = await gameId.data;
//     let gameDetail = [
//       {
//         id: el.id,
//         name: el.name,
//         description: el.description,
//         image: el.background_image,
//         released: el.released,
//         rating: el.rating,
//         genres: el.genres.map((e) => e.name),
//         platforms: el.platforms.map((e) => e.platform.name),
//       },
//     ];
//     gameDetail.length
//       ? res.status(200).json(gameDetail)
//       : res.status(404).send("Did not find game by Id");
//   } else {
//     let gameDb = await Videogame.findByPk(id, {
//       include: [
//         {
//           model: Genre,
//           attributes: ["name"],
//           through: {
//             attributes: [],
//           },
//         },
//         {
//           model: Platform,
//           attributes: ["name"],
//           through: {
//             attributes: [],
//           },
//         },
//       ],
//     });
//     let toString = [];
//     toString.push(gameDb);
//     res.status(200).json(toString);
//   }
// };
