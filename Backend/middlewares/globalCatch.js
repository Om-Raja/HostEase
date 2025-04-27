const globalCatch = (err, req, res, next) => {
    console.error(`Error occurred in ${req.method} ${req.path}:`, err);

    const statusCode = err.status || 500;
    const message = process.env.NODE_ENV === "production" 
        ? "Internal server error" 
        : err.message || "Internal server error"; 

    res.status(statusCode).json({ message });
};

module.exports = globalCatch;