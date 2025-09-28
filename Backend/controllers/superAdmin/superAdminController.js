const User = require("../../models/user");

const fetchEmployee = async (req, res) =>{
    try{
        const employees = await User.find({role: {$in:["messManager", "careTaker"]}});

        if(!employees) return res.status(404).json({message:"No employee found!"});

        res.json({employees, message: "employees detail fetched"});

    }catch(err){
        console.error(err);
        res.status(500).json({message: "Something went wrong in fetching employee details"});
    }
}

const assignRole = async(req, res) => {
    try{
        const {email, role} = req.body;

        if(!email || !role) return res.status(400).json({message: "email and role are required to assign role"});

        const employee = await User.find({email});
        if(!employee) return res.status(404).json({message: "No user found with this email"});

        const result = await User.findByIdAndUpdate(employee._id, {role: role}, {new: true});
        if(!result) return res.json({message: "Could not change the role"});

        res.json({message: `${employee.name} is ${role} now`});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Something went wrong in assigning role"});
    }
}

module.exports = {fetchEmployee, assignRole};