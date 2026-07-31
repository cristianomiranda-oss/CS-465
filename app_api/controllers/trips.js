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
    return res.status(500).json(err.message);
  } else {
    // Returns resulting trips list
    return res.status(200).json(q);
  }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of the outcome, response includes an HTML status code and a JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
  // Filters for a specific trip based on its code
  const q = await Model.find({'code': req.params.tripCode}).exec();

  // DEBUG: shows the results of the query
  //   console.log(q);

  if (!q) {
    // Database returned no data
    return res.status(500).json(err.message);
  } else {
    // Returns resulting trips list
    return res.status(200).json(q);
  }
};

module.exports = {
    tripsList,
    tripsFindByCode
}
