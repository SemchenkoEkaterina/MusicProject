const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer token
        if (!token) {
            return res.status(401).json({message: "Не авторизован"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {id: decoded.id, email: decoded.email, role: decoded.role};
        next();
    } catch (error) {
        res.status(401).json({message: "Не авторизован"});
    }
}