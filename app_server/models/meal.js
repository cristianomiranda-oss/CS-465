const mongoose = require("mongoose");

// Define the room schema
const mealSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const Meal = mongoose.model("meals", mealSchema);
module.exports = Meal;
