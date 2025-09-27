const jwt = require("jsonwebtoken");

const isCareTaker = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Invalid token format. Please log in again." });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode.role === "careTaker") {
            req.user = decode;
            return next();
        }
        return res.status(403).json({ message: "Access denied. Only a careTaker can perform this action." });
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }
};


const isMessManager = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Invalid token format. Please log in again." });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode.role === "messManager") {
            req.user = decode;
            return next();
        }
        return res.status(403).json({ message: "Access denied. Only a careTaker can perform this action." });
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }
};

const isSuperAdmin = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Invalid token format. Please log in again." });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode.role === "superAdmin") {
            req.user = decode;
            return next();
        }
        return res.status(403).json({ message: "Access denied. Only a careTaker can perform this action." });
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }
};

module.exports = {isCareTaker, isMessManager, isSuperAdmin};