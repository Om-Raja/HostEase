const router = require("express").Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const {isCareTaker} = require("../../middlewares/checkRole.js");
const {updateQueryResponse, getAllQueries} = require("../../controllers/adminQueryController");

router.patch("/:id", isLoggedIn, isCareTaker, updateQueryResponse);
router.get("/", isLoggedIn, isCareTaker, getAllQueries);

module.exports = router;