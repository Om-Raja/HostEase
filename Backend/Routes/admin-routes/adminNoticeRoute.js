const router = require("express").Router();

const isLoggedIn = require("../../middlewares/isLoggedIn");
const {isCareTaker} = require("../../middlewares/checkRole.js");
const validateNotice = require("../../middlewares/validateNotice");
const {postNotice, editNotice, showAllNotices} = require("../../controllers/adminNoticeController");

router.post("/", isLoggedIn, isCareTaker, validateNotice, postNotice);
router.get("/", isLoggedIn, isCareTaker, showAllNotices);
router.patch("/:id", isLoggedIn, isCareTaker, validateNotice, editNotice);

module.exports = router;