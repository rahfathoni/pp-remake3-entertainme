const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movieController');
const TvSeriesController = require('../controllers/tvSeriesController');

// movies
router.get('/movies/', MovieController.readMovies)
router.get('/movies/:movieId', MovieController.readMovieById)
router.post('/movies', MovieController.addMovie)
router.delete('/movies/:movieId', MovieController.deleteMovie)
router.put('/movies/:movieId', MovieController.updateMovie)

// tvseries
router.get('/tvSeries/', TvSeriesController.readTvSeries)
router.get('/tvSeries/:tvSeriesId', TvSeriesController.readTvSeriesById)
router.post('/tvSeries', TvSeriesController.addTvSeries)
router.delete('/tvSeries/:tvSeriesId', TvSeriesController.deleteTvSeries)

module.exports = router;