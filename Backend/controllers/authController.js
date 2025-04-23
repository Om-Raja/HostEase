const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const signUpController = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const newUser = new userModel({
      name,
      email,
      password,
    });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({
        message: "Signup successful",
        success: true,
    })
  } catch (err) {
    res.status(500).json({
        message:"Internal server error",
        success: false,
    });
  }
};

const loginController = async function (req, res){
  try{
    const {email, password} = req.body;
    const user = await userModel.findOne({email});

    if(!user){
      return res.status(401).json({message:"Unauthorised! Email or password is incorrect!"});
    }

    bcrypt.compare(password, user.password, function(err, result){
      if(result){
        return res.status(200).json({message:"Login successful", success: true});
      }
      res.status(401).json({err, message: "Unauthorised! Email or password is incorrect!"});
    })

  }catch(error){
    res.status(500).json({error, message: "something went wrong!"});
  }

}

const logOutController = function(req, res){
  //logout
} 

module.exports = {signUpController, loginController};