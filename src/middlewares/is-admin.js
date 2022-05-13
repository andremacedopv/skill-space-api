const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const user = req.user;
    if(!user) {
        const error = new Error("Not authenticated")
        error.statusCode = 401;
        throw error;
    }

    if(!user.admin) {
        const error = new Error("Unauthorized")
        error.statusCode = 401;
        throw error;
    }
    next();
};