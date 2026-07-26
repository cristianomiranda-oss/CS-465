// Imports the DB connection and Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');
const Room = require('./room');
const Meal = require('./meal');

// Reads seed data from the appropriate json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf-8'));
var rooms = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf-8'));
var meals = JSON.parse(fs.readFileSync('./data/meals.json', 'utf-8'));

// Deletes any existing records and inserts the seed data
const seedDB = async () => {
    // Deletes all records
    await Trip.deleteMany({});
    // Inserts seed data
    await Trip.insertMany(trips);

    // Deletes all records
    await Room.deleteMany({});
    // Inserts seed data
    await Room.insertMany(rooms);

    // Deletes all records
    await Meal.deleteMany({});
    // Inserts seed data
    await Meal.insertMany(meals);
}

//Closes the MongoDB connection and exits
seedDB().then(async () => {
    // Closes connection
    await Mongoose.connection.close();
    // Exits the process
    process.exit(0);
})