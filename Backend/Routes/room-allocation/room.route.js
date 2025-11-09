const express = require("express");
const router = express.Router();
const {addRoom} = require("../../controllers/room/room.controller.js");

//todo: add check role === caretaker middleware here
router.post("/", addRoom);

module.exports = router;