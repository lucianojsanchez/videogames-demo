const { getApiPlatforms } = require("../utils/getPlatforms.js");

const getPlatforms = async (req, res) => {
  try {
    let results = await getApiPlatforms();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  getPlatforms,
};
