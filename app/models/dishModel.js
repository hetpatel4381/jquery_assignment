const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    name: String,
    imgUrl: String,
    price: String,
});

module.exports = mongoose.model("Dish", DishSchema);