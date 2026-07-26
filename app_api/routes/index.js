const express = require("express");
const router = express.Router();

// IMports the trips controller
const tripsController = require("../controllers/trips");
const mealsController = require("../controllers/meals");
const roomsController = require("../controllers/rooms");

// Defines routes for trip endpoints
router.route("/trips").get(tripsController.tripsList);
router.route("/trips/:tripCode").get(tripsController.tripsFindByCode);

// Defines routes for meal endpoints
router.route("/meals").get(mealsController.mealsList);
router.route("/meals/:mealCode").get(mealsController.mealsFindByCode);

// Defines routes for room endpoints
router.route("/rooms").get(roomsController.roomsList);
router.route("/rooms/:roomCode").get(roomsController.roomsFindByCode);

module.exports = router;
