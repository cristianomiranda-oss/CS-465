const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: { type: String, required: true },
  hash: String,
  salt: String,
});

// Method to set the password on this record.
userSchema.methods.setPassword = function (password) {
  // Generates the salt value for hashing the password
  this.salt = crypto.randomBytes(16).toString("hex");
  // Generates the hash password
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

// Method to compare entered password against stored hash
userSchema.methods.validatePassword = function (password) {
  // Hashes the passed in password and compares it to the value stored for the entry
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

// Method to generate a JSON Web Token for the current record
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      // Payload for our JSON Web Token
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.JWT_SECRET, //SECRET stored in .env file
    { expiresIn: "1h" },
  ); //Token expires an hour from creation
};

mongoose.model("users", userSchema);

const User = mongoose.model("users", userSchema);
module.exports = User;
