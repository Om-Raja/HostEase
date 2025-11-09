const Room = require("../../models/room.model.js");
const Request = require("../../models/roomRequest.model.js");
const User = require("../../models/user.js");

const getAllRoomData = async (req, res) => {
  try {
    const allRoomData = await Room.find({}).populate([
      {path: "owner", select: "_id name email branch urn branch batch"}
    ]);
    if (!allRoomData || allRoomData.length === 0)
      return res
        .status(404)
        .json({ success: false, error: "There are no room data" });

    res.status(200).json({
      success: true,
      message: "All room data is fetched",
      data: allRoomData,
    });
  } catch (err) {
    console.error("Error in getAllRoomData controller", err.message);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const addRoom = async (req, res) => {
  try {
    const { roomNumber, floor, block, hostel } = req.body;

    if (!roomNumber || !floor || !block || !hostel)
      return res.status(400).json({
        success: false,
        error: "Room Number, Floor, Block and Hostel number are required",
      });

    const doesRoomExist = await Room.findOne({roomNumber, hostel});
    if(doesRoomExist)
      return res.status(409).json({success: false, error: "Room already exist"});

    const newRoom = new Room({
      roomNumber,
      floor,
      block,
      hostel,
    });

    const response = await newRoom.save();
    if (!response)
      return res
        .status(400)
        .json({ success: false, error: "Format is not correct" });

    res
      .status(201)
      .json({ success: true, message: "Room added", data: response });
  } catch (err) {
    console.error("Error in addRoom controller", err.message);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const editRoom = async (req, res)=>{
    try{
        const {roomId} = req.params;
        const {roomNumber, floor, block, hostel, owner = []} = req.body;
        
        if(!roomId)
            return res.status(400).json({success: false, error: "Room Id is requied"});
        
        const oldRoom = await Room.findById(roomId);
        if(!oldRoom)
            return res.status(404).json({success: false, error: "Room doesn't exist"});

        oldRoom.roomNumber = roomNumber || oldRoom.roomNumber;
        oldRoom.floor = floor || oldRoom.floor;
        oldRoom.block = block || oldRoom.block;
        oldRoom.hostel = hostel || oldRoom.hostel;

        if(owner.length != 0){
            oldRoom.owner = owner || oldRoom.owner;
        }

        const response = await oldRoom.save();

        res.status(200).json({success: true, message: "Room data updated successfully!", data: response});
    }catch(err){
        console.error("Error in editRoom controller", err.message);
        res.status(500).json({success: false, error: "Something went wrong"});
    }

}

const deleteRoom = async (req, res) => {
    try{
        const roomId = req.params;
        if(!roomId)
            return res.status(400).json({success: false, error: "Room Id is required"});

        const response = await Room.findByIdAndDelete(roomId);
        if(!response)
            return res.staus(404).json({success: false, error: "Room doesn't exist"});

        res.status(200).json({success: true, message: "Room deleted successfully!", data: response});
    }catch(err){
        console.error("Error in deleteRoom controller", err.message);
        res.status(500).json({success: false, error: "Something went wrong"});
    }
}

// Request controllers
const sendRoomRequest = async(req, res)=>{
  try{
    const {userEmail, cgpa, hostelNo} = req.body;
    const preferredRoomList = JSON.parse(req.body.preferredRoomList);

    if(!preferredRoomList || preferredRoomList?.length === 0 || !userEmail || !cgpa || hostelNo)
      return res.status(400).json({success: false, error: "Room number, email, hostelNo and CGPA are required"});

    const room = await Room.find({roomNumber: {$in: preferredRoomList}, hostel: hostelNo}).select("_id");
    if(!room)
      return res.status(404).json({success: false, error: "Room doesn't exist"});

    const student = await User.findOne({email: userEmail});
    if(!student)
      return res.status(404).json({success: false, error: "Not a listed student"});


    const newRequest = new Request({
      room,
      requester: student._id,
      cgpa
    });

    const response = await newRequest.save();
    if(!response)
      return res.status(400).json({success:false, error: "Data validation failed"});

    res.status(200).json({success: true, message: "Request sent", data: response});
  }catch(err){
    console.error("Error occured in handleRoomRequest", err.message);
    res.status(500).json({success: false, error: "Something went wrong, check your data"});
  }
}

const showRoomRequest = async(req, res)=>{
  try{
    const allRequest = await Request.find({})
      .populate({
        path: "room",
        select: "roomNumber floor block hostel owner"
      })
      .populate({
        path: "requester",
        select: "name email crn urn branch mobile batch"
      })
      .sort({ cgpa: -1 }); // Sort by CGPA in descending order

    if(allRequest.length === 0) 
      return res.status(404).json({success: false, error: "No request found"});

    res.status(200).json({success: true, message: "Fetched all requests for room.", data: allRequest});
  }catch(err){
    console.error("Error in showRoomRequest controller", err.message);
    res.status(500).json({success: false, error: "Something went wrong"});
  }
}

const actOnRoomRequest = async(req, res)=>{
  try{
    const {reqId} = req.params;
    if(!reqId)
      return res.status(400).json({success: false, error: "Request Id is required"});
    
    const request = await Request.findById(reqId).populate([
      {path: "room", select: "_id, roomNumber owner"},
      {path: "requester", select: "_id, name"}
    ]);
    if(!request)
      return res.status(404).json({success: false, error: "This request doesn't exist"});

    for(let room of request.room){
      if(room.owner.length < 3){
        const availabeRoom = await Room.findById(room._id);
        availabeRoom.owner.push(request.requester._id);
        const response = await availabeRoom.save();
        if(!response)
          return res.status(400).json({success: false, error: `Couldn't assign room number ${room.roomNumber} to ${request.requester.name}`});

        return res.status(200).json({success: true, message: `Assigned room number ${room.roomNumber} to ${request.requester.name}`, data: response});
      }
    }

    res.status(409).json({success: false, error: `All request rooms are already occupied fully. Please request again for ohter room numbers`});
  }catch(err){
    console.error("Error in actOnRoomRequest controller", err.message);
    res.status(500).json({success: false, error: "Something went wrong"});
  }
}
module.exports = { showRoomRequest, sendRoomRequest, addRoom, getAllRoomData, editRoom, deleteRoom, actOnRoomRequest};