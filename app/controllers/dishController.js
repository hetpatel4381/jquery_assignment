const Dish = require("../models/dishModel");

const addDish = async (req, res) => {
  const { name, imgUrl, price } = req.body;

  try {
    const newDish = new Dish({
      name,
      imgUrl,
      price,
    });

    //adding the new dish to DB.
    const dish = await newDish.save();

    res.json({ success: true, msg: "Dish is Added Successfully" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, msg: "Dish Adding Failed" });
  }
};

const getDishes = async (req, res) => {
  try {
    //fetching the all dishes from DB.
    const response = await Dish.find();
    console.log(response);
    res.json(response);
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = {
  addDish,
  getDishes,
};
