var fs = require('fs');
var tripes = JSON.parse(fs.readFileSync('./data/trips.json', 'utf-8'))

/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: "Travlr Getaways", trips })
}

module.exports = {
    travel
}