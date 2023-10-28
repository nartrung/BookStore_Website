const router = require("express").Router();
const PaymentController = require("../controllers/payment.controller");
const verifyToken = require("../middlewares/verify-token");

router.post("/shipment", PaymentController.createShipment);
router.post("/payment",verifyToken, PaymentController.payment);

module.exports = router;
