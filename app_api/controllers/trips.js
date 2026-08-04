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
  const q = await Model.find({ code: req.params.tripCode }).exec();

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

// POST: /trips - Add a new trip
// Regardless of the outcome, response includes an HTML status code and a JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description,
  });

  // Filters for a specific trip based on its code
  const q = await newTrip.save();

  if (!q) {
    // Database returned no data
    return res.status(500).json(err.message);
  } else {
    // Returns resulting new trip data
    return res.status(200).json(q);
  }

  // DEBUG: shows the results of the query
  //   console.log(q);
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status
code;
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
  // Uncomment for debugging
  console.log(req.params);
  console.log(req.body);

  const q = await Model.findOneAndUpdate(
    { code: req.params.tripCode },
    {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    },
  ).exec();

  if (!q) {
    // Database returned no data
    return res.status(400).json(err);
  } else {
    // Return resulting updated trip
    return res.status(201).json(q);
  }

  // DEBUG: shows the results of the database action
  // console.log(q);
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};
