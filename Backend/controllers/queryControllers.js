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

const getQuery = async (req, res) => {
    try {
        const userId = req.user._id;

        const queries = await Query.find({ user: userId });
        if (!queries || queries.length === 0) {
            return res.status(404).json({ message: "No queries found for your account." });
        }

        res.status(200).json(queries); 
    } catch (err) {
        console.error(`Error in fetching queries for user ${req.user.email}:`, err);
        res.status(500).json({ message: "An error occurred while fetching your queries." });
    }
};

module.exports = { addQuery, getQuery };