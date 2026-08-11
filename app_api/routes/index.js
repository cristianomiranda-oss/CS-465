const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // Enables JSON Web Tokens

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
  // console.log('In Middleware');
  const authHeader = req.headers["authorization"];
  // console.log('Auth Header: ' + authHeader);
  if (authHeader == null) {
    console.log("Auth Header Required but NOT PRESENT!");
    return res.sendStatus(401);
  }

  let headers = authHeader.split(" ");
  if (headers.length < 1) {
    console.log("Not enough tokens in Auth Header: " + headers.length);
    return res.sendStatus(501);
  }

  const token = authHeader.split(" ")[1];
  // console.log('Token: ' + token);
  if (token == null) {
    console.log("Null Bearer Token");
    return res.sendStatus(401);
  }
  // console.log(process.env.JWT_SECRET);
  // console.log(jwt.decode(token));

  const verified = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, verified) => {
      if (err) {
        return res.sendStatus(401).json("Token Validation Error!");
      }
      req.auth = verified; // Set the auth param to the decoded object
    },
  );
  next(); // We need to continue or this will hang forever
}

// Imports the various controllers
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");
const mealsController = require("../controllers/meals");
const roomsController = require("../controllers/rooms");

// Defines routes for the register and login endpoints
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

// Defines routes for trip endpoints
router
  .route("/trips")
  .get(tripsController.tripsList) // Get Method returns trip list
  .post(authenticateJWT, tripsController.tripsAddTrip); // Post Method Adds a Trip

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode) // Get Method returns a trip
  .put(authenticateJWT, tripsController.tripsUpdateTrip) // Put Method updates a trip
  .delete(authenticateJWT, tripsController.tripsDeleteTrip); // Delete Method Removes a Trip

// Defines routes for meal endpoints
router.route("/meals").get(mealsController.mealsList);
router.route("/meals/:mealCode").get(mealsController.mealsFindByCode);

// Defines routes for room endpoints
router.route("/rooms").get(roomsController.roomsList);
router.route("/rooms/:roomCode").get(roomsController.roomsFindByCode);

module.exports = router;
