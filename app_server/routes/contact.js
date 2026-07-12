var express = require('express');
var router = express.Router();
const controller = require('../controllers/contact')

/* GET contract page. */
router.get('/', controller.contact);

module.exports = router;
