const express = require('express');
const router = express.Router();
const vacanciesController = require('../controllers/vacanciesCont');

router.get('/vacancys', vacanciesController.getVacancies);
router.get('/all_vacancys', vacanciesController.getAllVacancies);

module.exports = router;