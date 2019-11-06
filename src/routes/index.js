const router = require('express').Router();
const indexController = require('../controllers/indexController');

// header routes

router.get('/', indexController.homePage);

router.get('/rooms.html', indexController.roomsPage);

router.get('/booking-error.html', indexController.roomsPage);

router.get('/news.html', indexController.roomsPage);

module.exports = router;
