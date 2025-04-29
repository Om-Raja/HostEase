const isLoggedIn = require("../middlewares/isLoggedIn");
const {getAllNotices} = require("../controllers/noticeController");
const router = require("express").Router();

router.get("/", isLoggedIn, getAllNotices);

module.exports = router;