const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const verifyToken = require("../middlewares/verify-token");

router.get("/orders",verifyToken, OrderController.getAllOrder);
router.get("/allOrders", OrderController.getAll);
router.put("/updateOrder/:id", OrderController.updateOrderStatus);

module.exports = router;
