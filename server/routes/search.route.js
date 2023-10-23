const router = require("express").Router();
const SearchController = require("../controllers/search.controller");


router.post("/search", SearchController.search);

module.exports = router;