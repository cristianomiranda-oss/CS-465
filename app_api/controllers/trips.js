const mongoose = require("mongoose");
const Trip = require("../models/travlr");
const Model = mongoose.model("trips");

// GET: /trips - lists all the trips
// Regardless of the outcome, response includes an HTML status code and a JSON message to the requesting client
const tripsList = async (req, res) => {
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

module.exports = {
    tripsList
}
