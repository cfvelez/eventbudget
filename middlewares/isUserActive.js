module.exports = (req, res, next) => {
    
    if (req.user.status === true) return next();
  
    res.status(403).json({ message: "El usuario no está activo" });
  };
  