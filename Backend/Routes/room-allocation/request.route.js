const express = require("express")
const {isCareTaker} = require("../../middlewares/checkRole.js")
const router = express.Router();

const {showRoomRequest, sendRoomRequest, actOnRoomRequest} = require("../../controllers/room/room.controller.js");

router.post("/", sendRoomRequest);
router.get("/", isCareTaker, showRoomRequest); 
router.post("/:reqId", isCareTaker, actOnRoomRequest); 

module.exports = router;