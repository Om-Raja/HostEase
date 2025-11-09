const express = require("express")
const {isCareTaker} = require("../../middlewares/checkRole.js")
const router = express.Router();

const {showRoomRequest, sendRoomRequest, actOnRoomRequest} = require("../../controllers/room/room.controller.js");

router.post("/", sendRoomRequest);
router.get("/", showRoomRequest); //todo: add iscaretaker role check here
router.post("/:reqId", actOnRoomRequest); //todo: add is caretaker role check here also

module.exports = router;