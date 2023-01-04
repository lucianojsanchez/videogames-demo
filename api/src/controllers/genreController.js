const { getApiGenres } = require("../utils/getGenres.js");

const getGenres = async (req, res) => {
  try {
    let results = await getApiGenres();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  getGenres,
};
