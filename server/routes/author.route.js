const router = require('express').Router();
const uploadCloud = require('../middlewares/upload-photo');
const AuthorController = require("../controllers/author.controller");

router.post('/authors',uploadCloud.single('photo'), AuthorController.create)

router.get('/authors', AuthorController.findAll);
router.get('/authors/:id', AuthorController.getOne);

router.delete('/authors/:id', AuthorController.delete);
router.put("/authors/:id", AuthorController.updateProfile);

module.exports = router;