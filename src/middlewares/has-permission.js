const User = require("../models/user");
const Permission = require("../models/permission")

module.exports = (permission) => {
  return (req, res, next) => {
    const user = req.user;
    if(!user) {
        const error = new Error("Not authenticated")
        error.statusCode = 401;
        throw error;
    }

    let hasPermission = false
    User.findByPk(user.id, {include: [{model: Permission, as: 'permissions'}]})
    .then(u => {
      u.permissions.forEach(per => {
        if (per.dataValues.name === permission) hasPermission = true
      });
      if(!user.admin && !hasPermission && !user.owner) {
        const error = new Error("Unauthorized")
        error.statusCode = 401;
        next(error);
      }
      next();
    })
  };
}