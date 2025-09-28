const User = require("../../models/user");

const fetchEmployee = async (req, res) =>{
    try{
        const employees = await User.find({role: {$in:["messManager", "careTaker"]}});

        if(!employees) return res.status(404).json({message:"No employee found!"});

        res.json({employees, message: "employees detail fetched"});

    }catch(err){
        console.error("Error: ", err);
        res.status(500).json({message: "Something went wrong in fetching employee details"});
    }
}

module.exports = {fetchEmployee};