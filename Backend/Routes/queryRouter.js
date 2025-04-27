const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const queryValidation = require("../middlewares/queryValidation");
const { addQuery } = require("../controllers/queryControllers");

router.post("/ask", isLoggedIn, queryValidation, addQuery);