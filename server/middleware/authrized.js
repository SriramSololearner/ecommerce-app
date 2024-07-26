const Authorization = (requiredRole) => {
  return (req, res, next) => {
    const { role, } = req.user;

    if (role !== requiredRole) {
      return res.status(403).json({
        error: "Forbidden: You are not authorized to access this resource",
      });
    }
    next();
  };
};

module.exports = Authorization;
