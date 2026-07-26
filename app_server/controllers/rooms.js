const roomsEndpoint = "http://localhost:3000/api/rooms";
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

// var fs = require('fs');
// var roomsData = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf-8'));

/* GET rooms view */
const rooms = async function (req, res, next) {
  // console.log("ROOMS CONTROLLER BEGIN")
  await fetch(roomsEndpoint, options)
    .then((res) => res.json())
    .then((json) => {
      let message = null;
      // checks if the returned json is an Array
      if (!(json instanceof Array)) {
        // Sets the message and updates json to an empty array
        message = "API lookup error";
        json = [];
      } else {
        // Confirms that the json array at least has one element within it
        if (!json.length) {
            // Updates message to indicate no element exist in the array
          message = "No trips exist in our database!";
        }
      }
      res.render('rooms', {title: "Travlr Getaways", roomsData: json, message})
    })
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
    rooms
}