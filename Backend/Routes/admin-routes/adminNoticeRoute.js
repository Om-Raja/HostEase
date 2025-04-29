const router = require("express").Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const validateNotice = require("../../middlewares/validateNotice");
const {postNotice, editNotice} = require("../../controllers/adminNoticeController");

router.post("/", isLoggedIn, isAdmin, validateNotice, postNotice);
router.patch("/:id", isLoggedIn, isAdmin, validateNotice, editNotice);