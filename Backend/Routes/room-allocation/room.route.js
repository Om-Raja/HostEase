const express = require("express");
const router = express.Router();
const {addRoom, getAllRoomData, deleteRoom, editRoom} = require("../../controllers/room/room.controller.js");
const { isCareTaker } = require("../../middlewares/checkRole.js");

router.post("/", isCareTaker, addRoom);
router.get("/", isCareTaker, getAllRoomData);
router.patch("/", isCareTaker, editRoom);
router.delete("/", isCareTaker, deleteRoom);

module.exports = router;