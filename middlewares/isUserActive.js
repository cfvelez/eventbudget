module.exports = (req, res, next) => {
      console.log(req.user);
    if (req.user) return next();
  
    return res.status(403).json({ message: "El usuario no está activo" });
  };
  