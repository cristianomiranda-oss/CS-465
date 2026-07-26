const express = require("express");
const router = express.Router();

// IMports the trips controller
const tripsController = require("../controllers/trips");
const mealsController = require("../controllers/meals");

// Defines routes for trip endpoints
router.route("/trips").get(tripsController.tripsList);
router.route("/trips/:tripCode").get(tripsController.tripsFindByCode);

// Defines routes for trip endpoints
router.route("/meals").get(mealsController.mealsList);
router.route("/meals/:mealCode").get(mealsController.mealsFindByCode);

module.exports = router;
