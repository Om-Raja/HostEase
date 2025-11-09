const express = require("express")
const {isCareTaker} = require("../../middlewares/checkRole.js")
const router = express.Router();

const {showRoomRequest, handleRoomRequest, addRoom} = require("../../controllers/room/room.controller.js");

router.post("/", handleRoomRequest);
router.get("/", showRoomRequest); //todo: add iscaretaker role check here

module.exports = router;