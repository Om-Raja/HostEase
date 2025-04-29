const router = require("express").Router();

const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const validateNotice = require("../../middlewares/validateNotice");
const {postNotice, editNotice, showAllNotices} = require("../../controllers/adminNoticeController");

router.post("/", isLoggedIn, isAdmin, validateNotice, postNotice);
router.get("/", isLoggedIn, isAdmin, showAllNotices);
router.patch("/:id", isLoggedIn, isAdmin, validateNotice, editNotice);

module.exports = router;