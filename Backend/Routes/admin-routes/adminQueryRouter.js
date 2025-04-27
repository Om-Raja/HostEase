const router = require("express").Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const {updateQueryResponse, getAllQueries} = require("../../controllers/adminQueryController");

router.patch("/:id", isLoggedIn, isAdmin, updateQueryResponse);
router.get("/", isLoggedIn, isAdmin, getAllQueries);

module.exports = router;