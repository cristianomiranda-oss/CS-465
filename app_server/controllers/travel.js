/* GET travel view */
const travel = (res, req) => {
    res.render('travel', {title: "Travlr Getaways"})
}

module.exports = {
    travel
}