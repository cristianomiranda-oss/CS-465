const mongoose = require("mongoose");
const User = require("../models/user");

const register = async (req, res) => {
  //Validate message to insure that all parameters are present
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(500).json({ message: "All fields required" });
  }

  const user = new User({
    name: req.body.name, // Set username
    email: req.body.email, // Set email address
    password: "", // Start with an empty password
  });
  user.setPassword(req.body.password); // Sets the user password
  const q = await user.save();

  if (!q) {
    // Database returned no data
    return res.status(500).json(err.message);
  } else {
    // Return new user token
    const token = user.generateJWT();
    return res.status(200).json(token);
  }
};


module.exports = { register };
