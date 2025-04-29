const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Invalid token format. Please log in again." });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode.role === "admin") {
            req.user = decode;
            return next();
        }
        return res.status(403).json({ message: "Access denied. Only admins can perform this action." });
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }
};

module.exports = isAdmin;
