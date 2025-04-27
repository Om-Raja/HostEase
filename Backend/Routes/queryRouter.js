const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const queryValidation = require("../middlewares/queryValidation");
const { addQuery, getQuery } = require("../controllers/queryControllers");

router.route("/")
.post(isLoggedIn, queryValidation, addQuery)
.get(isLoggedIn, getQuery);

module.exports = router;