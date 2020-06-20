const express = require('express');
const router = express.Router();
const CombineController = require('../controllers/combineController');

router.get('/', CombineController.readAllData)

module.exports = router;