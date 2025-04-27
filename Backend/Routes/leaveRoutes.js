const isLoggedIn = require("../middlewares/isLoggedIn");
const { applyForLeave , updateLeaveRequest} = require("../controllers/leaveController");
const router = require("express").Router();

router.post("/", isLoggedIn, applyForLeave);
router.patch("/:id", isLoggedIn, updateLeaveRequest);

module.exports = router;