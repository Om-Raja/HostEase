const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const { isSuperAdmin } = require("../../middlewares/checkRole.js");
const {fetchEmployee, assignRole}= require("../../controllers/superAdmin/superAdminController.js");

router
  .route("/")
  .get(isLoggedIn, isSuperAdmin, fetchEmployee)
  .patch(isLoggedIn, isSuperAdmin, assignRole);

module.exports = router;