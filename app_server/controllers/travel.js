const tripsEndpoint = "http://localhost:3000/api/trips";
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

// var fs = require("fs");
// var trips = JSON.parse(fs.readFileSync("./data/trips.json", "utf-8"));

/* GET travel view */
const travel = async function (req, res, next) {
  // console.log("TRAVEL CONTROLLER BEGIN")
  await fetch(tripsEndpoint, options)
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
      res.render("travel", { title: "Travlr Getaways", trips: json, message });
    })
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
  travel,
};
