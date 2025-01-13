const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: "Authorization header missing" });
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(403).json({ error: "Token not provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        console.log(req.userId)
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}

module.exports = {authMiddleware}