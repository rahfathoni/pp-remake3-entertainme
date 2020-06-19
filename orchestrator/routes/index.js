const express = require('express');
const router = express.Router();
const movieRouter = require('./movieRouter')
const tvSeriesRouter = require('./tvSeriesRouter')

router.get('/', (req, res) => {
    res.status(200).json({
        message: `EntertainMe working`
    })
})
router.use('/movies', movieRouter)
router.use('/tvSeries', tvSeriesRouter)

module.exports = router;