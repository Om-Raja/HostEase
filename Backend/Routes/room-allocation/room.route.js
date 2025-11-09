const express = require("express");
const router = express.Router();
const {addRoom, getAllRoomData, deleteRoom, editRoom} = require("../../controllers/room/room.controller.js");

//todo: add check role === caretaker middleware here
router.post("/", addRoom);
router.get("/", getAllRoomData);
router.patch("/", editRoom);
router.delete("/", deleteRoom);

module.exports = router;