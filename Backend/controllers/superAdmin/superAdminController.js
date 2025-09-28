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
        const role = req.body.role;

        if(!role){
            const email = req.body.email;
            if(!email) return res.status(400).json({message: "Email is required to asssign role"});
            const person = await User.find({email});
            return res.json({person});
        }

        const employeeId = req.body.employeeId;
        const result = await User.findByIdAndUpdate(employeeId, {role: role}, {new: true});
        if(!result) return res.json({message: "Could not change the role"});

        res.json({message: `${result.name} is ${result.role} now`});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Something went wrong in assigning role"});
    }
}

const removeRole = async(req, res)=>{
    const employeeId = req.query.employeeId;
    if(!employeeId) return res.status(400).json({message:"Employee Id is required to remove him from the post"});

    const result = await User.findByIdAndDelete(employeeId);
    if(!result) res.json({message: "Either employee doesn't exist or we could not remove him. Try again"});

    res.status(200).json({message: "Employee removed"});
}

module.exports = {fetchEmployee, assignRole, removeRole};