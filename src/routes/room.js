const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/', roomController.createRoom);
router.post('/book/:id', roomController.bookRoom);
router.post('/test', (req, res) => {
  console.log(req.body);
});

module.exports = router;
