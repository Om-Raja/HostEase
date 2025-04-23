const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next)=>{
    const auth = req.headers["authorization"];
    if(!auth){
        return res.status(401).json({message: "Unauthorized action!"});
    }

    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET); //throws error if not verified so code below doesn't run , execution jumps to catch block
        req.user = decoded;
        return next();
    }catch(err){
        return res.status(401).json({message: "Session expired or Unauthoized action"});
    }
}

module.exports = isAuthenticated;