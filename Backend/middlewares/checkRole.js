const userModel = require("../models/user");
async function isAdmin(req, res, next){
    const {email} = req.body;
    const role = userModel.findOne({email});
    
    if(role === "admin"){
        return next();
    }
    return res.status(401).json({message: "Access Denied!"});
}


async function isPrincipal(req, res, next){
    const {email} = req.body;
    const role = userModel.findOne({email});
    
    if(role === "principal"){
        return next();
    }
    return res.status(401).json({message: "Access Denied!"});
}

module.exports = {isAdmin, isPrincipal};

