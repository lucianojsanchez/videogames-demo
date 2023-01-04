const axios = require("axios");
require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const { Platform } = require("../db.js");

const getApiPlatforms = async (req, res) => {
  const apiInfo = await axios.get(
    `https://api.rawg.io/api/platforms?key=${YOUR_API_KEY}`,
    {
      headers: {
        "accept-encoding": "*",
      },
    }
  );
  const apiPlatforms = await apiInfo.data.results.map((plat) => plat.name);
  apiPlatforms.forEach((plat) => {
    Platform.findOrCreate({
      where: {
        name: plat,
      },
    });
  });
  const allPlatforms = await Platform.findAll();
  return allPlatforms;
};

module.exports = { getApiPlatforms };
