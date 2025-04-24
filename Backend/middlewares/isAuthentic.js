const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next)=>{
    const auth = req.headers["authorization"];
    if(!auth){
        return res.status(401).json({message: "Please sign in first."});
    }

    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET); //throws error if not verified so code below doesn't run , execution jumps to catch block
        console.log("decoded = ", decoded);
        req.user = decoded;
        console.log(req.user);
        return next();
    }catch(err){
        return res.status(401).json({message: "Access Denied! Sign in again."});
    }
}

module.exports = isAuthenticated;