const axios = require("axios");
require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const { Genre } = require("../db.js");

// const getDbGenres = async () => {
//   const dbGenres = await Genre.findAll();
//   const dbGenresClean = dbGenres.map((genre) => {
//     return {
//       name: genre.name,
//       origin: "db",
//     };
//   });
//   return dbGenresClean;
// };

// const getApiGenres = async () => {
//   const apiGenres = await axios.get(
//     `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`,
//     {
//       headers: {
//         "accept-encoding": "*",
//       },
//     }
//   );
//   const apiGenresClean = apiGenres.data.results.map((genre) => {
//     return {
//       name: genre.name,
//       id: genre.id,
//       origin: "api",
//     };
//   });

//   return apiGenresClean;
// };

// const getAllGenres = async () => {
//   const dbGenres = await getDbGenres();
//   const apiGenres = await getApiGenres();
//   return [...dbGenres, ...apiGenres];
// };

const getApiGenres = async (req, res) => {
  const apiInfo = await axios.get(
    `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`,
    {
      headers: {
        "accept-encoding": "*",
      },
    }
  );
  const apiGenre = await apiInfo.data.results.map((genre) => genre.name);
  apiGenre.forEach((genre) => {
    Genre.findOrCreate({
      where: {
        name: genre,
      },
    });
  });
  const allGenres = await Genre.findAll();
  return allGenres;
};

module.exports = { getApiGenres };
