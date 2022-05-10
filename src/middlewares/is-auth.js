const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        const error = new Error("Not authenticated")
        error.statusCode = 401;
        throw error;
    }
    let decodedTkn;
    try {
        decodedTkn = jwt.verify(token, 'SecretToken')
    } catch (e) {
        e.statusCode = 500;
        throw e;
    }
    if (!decodedTkn) {
        const error = new Error("Not authenticated")
        error.statusCode = 401;
        throw error;
    }
    req.user = decodedTkn.user;
    next();
};