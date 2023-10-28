const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const verifyToken = require("../middlewares/verify-token");

router.get("/orders",verifyToken, OrderController.getAllOrder);

module.exports = router;
