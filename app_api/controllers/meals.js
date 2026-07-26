const mongoose = require("mongoose");
const Meal = require("../models/meal");
const Model = mongoose.model("meals");

// GET: /meals - lists all the meals
// Regardless of the outcome, response includes an HTML status code and a JSON message to the requesting client
const mealsList = async (req, res) => {
  // Collects all models by not passing in any filter
  const q = await Model.find({}).exec();

  // DEBUG: shows the results of the query
  //   console.log(q);

  if (!q) {
    // Database returned no data
    return res.status(404).json(err);
  } else {
    // Returns resulting trips list
    return res.status(200).json(q);
  }
};

// GET: /meals/:mealCode - lists a single meal
// Regardless of the outcome, response includes an HTML status code and a JSON message to the requesting client
const mealsFindByCode = async (req, res) => {
  // Filters for a specific trip based on its code
  const q = await Model.find({'code': req.params.mealCode}).exec();

  // DEBUG: shows the results of the query
  //   console.log(q);

  if (!q) {
    // Database returned no data
    return res.status(404).json(err);
  } else {
    // Returns resulting trips list
    return res.status(200).json(q);
  }
};

module.exports = {
    mealsList,
    mealsFindByCode
}
