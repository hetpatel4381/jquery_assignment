const express = require("express");
const router = express.Router();
const DishController = require("../controllers/dishController");

router.post("/add", DishController.addDish);
router.get("/getDishes", DishController.getDishes);

module.exports = router;