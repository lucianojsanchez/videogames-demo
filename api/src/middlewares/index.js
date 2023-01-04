const validateVideogame = (req, res, next) => {
  const { name, description, released, rating, genres, platforms, image } =
    req.body;
  if (!name) return res.status(400).json({ error: "A name is required" });
  if (!description)
    return res.status(400).json({ error: "A description is required" });
  if (!released)
    return res.status(400).json({ error: "A release date is required" });
  if (!rating) return res.status(400).json({ error: "A rating is required" });
  if (!genres)
    return res.status(400).json({ error: "At least one genre is required" });
  if (!platforms)
    return res.status(400).json({ error: "At least one platform is required" });
  if (!image)
    return res.status(400).json({ error: "At least one image is required" }); // url validado en models?
  next();
};

module.exports = { validateVideogame };

//esta bien validar 2 veces?
