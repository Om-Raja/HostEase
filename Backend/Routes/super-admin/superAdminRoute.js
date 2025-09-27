const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const { isSuperAdmin } = require("../../middlewares/checkRole.js");
const assignRoleController = require("../../controllers/superAdmin/assingRoleController.js");
const seeTeamController = require("../../controllers/superAdmin/seeTeamController.js");

router
  .route("/")
  .get(isLoggedIn, isSuperAdmin, seeTeamController)
  .post(isLoggedIn, isSuperAdmin, assignRoleController);

module.exports = router;