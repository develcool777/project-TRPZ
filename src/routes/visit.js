const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');

router.post('/', visitController.createVisit);

router.get('/', visitController.getAllVisits);
router.get('/:id', visitController.getVisit);
router.get('/client/:id', visitController.getAllVisitsByClientId);
router.put('/:id', visitController.updateVisit);
module.exports = router;
