const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movieController');

router.get('/', MovieController.readMovies)
router.get('/:movieId', MovieController.readMovieById)
router.post('/', MovieController.addMovie)
router.delete('/:movieId', MovieController.deleteMovie)
router.put('/:movieId', MovieController.updateMovie)

module.exports = router;