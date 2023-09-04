const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.post("/auth/signup", UserController.create);

router.get("/auth/user/:id", UserController.profile);
router.put("/auth/user/:id", UserController.updateProfile);



module.exports = router;