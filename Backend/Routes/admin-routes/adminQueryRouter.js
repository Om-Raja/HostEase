const router = require("express").Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const {updateQueryResponse} = require("../../controllers/adminQueryController");

router.patch("/:id", isLoggedIn, isAdmin, updateQueryResponse);

module.exports = router;