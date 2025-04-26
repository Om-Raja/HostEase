const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Access denied. Please log in." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }
};

module.exports = isLoggedIn;