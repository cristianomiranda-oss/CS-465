const mongoose = require("mongoose");
const Room = require("../models/room");
const Model = mongoose.model("rooms");

// GET: /rooms - lists all the rooms
// Regardless of the outcome, response includes an HTML status code and a JSON message to the requesting client
const roomsList = async (req, res) => {
  // Collects all models by not passing in any filter
  const q = await Model.find({}).exec();

  // DEBUG: shows the results of the query
  //   console.log(q);

  if (!q) {
    // Database returned no data
    return res.status(404).json(err);
  } else {
    // Returns resulting rooms list
    return res.status(200).json(q);
  }
};

// GET: /rooms/:roomCode - lists a single trip
// Regardless of the outcome, response includes an HTML status code and a JSON message to the requesting client
const roomsFindByCode = async (req, res) => {
  // Filters for a specific trip based on its code
  const q = await Model.find({ code: req.params.roomCode }).exec();

  // DEBUG: shows the results of the query
  //   console.log(q);

  if (!q) {
    // Database returned no data
    return res.status(404).json(err);
  } else {
    // Returns resulting room
    return res.status(200).json(q);
  }
};

module.exports = {
  roomsList,
  roomsFindByCode,
};
