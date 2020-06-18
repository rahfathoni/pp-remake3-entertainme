const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movieController');

router.get('/', MovieController.readMovies)

module.exports = router;