const Query = require("../models/query");

const addQuery = async (req, res)=>{
    try{
        const query = req.body.query;
        if(!query){
            return res.status(400).json({message: "No query recieved."});
        }
    
        const newQuery = new Query({...query, user: req.user._id,});
        await newQuery.save();

        res.status(201).json({message: "Query added successfully!"});
    }catch(err){
        console.error("Saving query into DB failed", err);
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = { addQuery };