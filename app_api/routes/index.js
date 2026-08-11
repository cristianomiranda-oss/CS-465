const express = require("express");
const router = express.Router();

// Imports the various controllers
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");
const mealsController = require("../controllers/meals");
const roomsController = require("../controllers/rooms");

// Defines routes for the register and login endpoints
router.route("/register").post(authController.register);
// router.route("/login").post(authController.login);

// Defines routes for trip endpoints
router
  .route("/trips")
  .get(tripsController.tripsList) // Get Method returns trip list
  // .post(authenticateJWT, tripsController.tripsAddTrip); // Post Method Adds a Trip

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode) // Get Method returns a trip
  .put(tripsController.tripsUpdateTrip) // Put Method updates a trip
  .delete(tripsController.tripsDeleteTrip); // Delete Method Removes a Trip

// Defines routes for meal endpoints
router.route("/meals").get(mealsController.mealsList);
router.route("/meals/:mealCode").get(mealsController.mealsFindByCode);

// Defines routes for room endpoints
router.route("/rooms").get(roomsController.roomsList);
router.route("/rooms/:roomCode").get(roomsController.roomsFindByCode);

module.exports = router;
