function requireUser(req, res, next) {
    try {
      if (!req.user) {
        res.status(401);
        next({
          name: "UnauthorizedError",
          message: "You must be logged in to perform this action",
        });
      } else {
        next();
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  module.exports = {
    requireUser,
  };