const express = require("express");
const router = express.Router();

// IMports the trips controller
const tripsController = require("../controllers/trips");

// Defines routes for trip endpoints
router.route("/trips").get(tripsController.tripsList);
router.route("/trips/:tripCode").get(tripsController.tripsFindByCode);

module.exports = router;
