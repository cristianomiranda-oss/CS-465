const mealsEndpoint = "http://localhost:3000/api/meals";
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

// var fs = require('fs');
// var mealsData = JSON.parse(fs.readFileSync('./data/meals.json', 'utf-8'));

/* GET meals view */
const meals = async function (req, res, next) {
  // console.log("MEALS CONTROLLER BEGIN")
  await fetch(mealsEndpoint, options)
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
          message = "No meals exist in our database!";
        }
      }
      res.render('meals', {title: "Travlr Getaways", mealsData: json, message})
    })
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
    meals
}