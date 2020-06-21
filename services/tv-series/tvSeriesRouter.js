const express = require('express');
const router = express.Router();
const TvSeriesController = require('./tvSeriesController');

router.get('/', TvSeriesController.readTvSeries)
router.get('/:tvSeriesId', TvSeriesController.readTvSeriesById)
router.post('/', TvSeriesController.addTvSeries)
router.delete('/:tvSeriesId', TvSeriesController.deleteTvSeries)
router.put('/:tvSeriesId', TvSeriesController.updateTvSeries)

module.exports = router