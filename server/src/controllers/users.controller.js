import User from "../models/user.model.js";

const getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err || !user) {
      res.send({
        error: dbErrorHandler.getErrorMessage(err),
      });
    } else {
      req.profile = user;
      next();
    }
  });
};

export default { getUserById };
