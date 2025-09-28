const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const { isSuperAdmin } = require("../../middlewares/checkRole.js");
const {fetchEmployee, assignRole, removeRole} = require("../../controllers/superAdmin/superAdminController.js");

router
  .route("/")
  .get(isLoggedIn, isSuperAdmin, fetchEmployee)
  .patch(isLoggedIn, isSuperAdmin, assignRole)
  .delete(isLoggedIn, isSuperAdmin, removeRole);

module.exports = router;