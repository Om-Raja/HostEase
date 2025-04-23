const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthentic");
const getProduct = require("../controllers/getProductController");

router.get("/product", isAuthenticated, getProduct);

module.exports = router;