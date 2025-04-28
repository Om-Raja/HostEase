const isLoggedIn = require("../middlewares/isLoggedIn");
const { applyForLeave , updateLeaveRequest, showMyLeaveRequest} = require("../controllers/leaveController");
const router = require("express").Router();

router.post("/", isLoggedIn, applyForLeave);
router.get("/", isLoggedIn, showMyLeaveRequest);
router.patch("/:id", isLoggedIn, updateLeaveRequest);

module.exports = router;