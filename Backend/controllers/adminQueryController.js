const QueryModel = require("../../models/query");

const updateQueryResponse = async (req, res)=>{
    try{
        const queryId = req.params.id;
        const {answer} = req.body;
        if(!queryId){
            return res.status(400).json({message: "Query ID is requierd to update query response"});
        }
        if(!answer){
            return res.status(400).json({message: "Answer is required to update response of query"});
        }

        const query = await QueryModel.findByIdAndUpdate(queryId, {answer: answer}, {new: true, runValidators: true});
        if(!query){
            return res.status(404).json({message: "Invalid query ID"});
        }
        res.status(200).json({message: "Query response updated successfully.", query});

    }catch(err){
        console.error(`Error in updating the query response. Error: ${err}`);
        res.status(500).json("Something went wrong");
    }
}

const getAllQueries = async (req, res)=>{
    try{
        const allQueries = await QueryModel.find({});
        if(!allQueries || allQueries.length === 0){
            return res.status(404).json({message: "No queries found at the moment"})
        }
        res.status(200).json({allQueries});

    }catch(err){
        console.error(err);
        res.status(500).json("Something went wrong");
    }
}

module.exports = { updateQueryResponse, getAllQueries };