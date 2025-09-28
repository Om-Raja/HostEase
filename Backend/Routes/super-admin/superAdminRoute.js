const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const { isSuperAdmin } = require("../../middlewares/checkRole.js");
const {fetchEmployee} = require("../../controllers/superAdmin/superAdminController.js");

router
  .route("/")
  .get(isLoggedIn, isSuperAdmin, fetchEmployee);

module.exports = router;