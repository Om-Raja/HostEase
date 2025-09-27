const jwt = require("jsonwebtoken");

const isSuperAdmin = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "Access denied. Please log in." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === "superAdmin") {
            req.user = decoded;
            return next();
        }
        return res.status(403).json({ message: "Access denied. Only superAdmins can perform this action." });
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }
};

module.exports = isSuperAdmin;