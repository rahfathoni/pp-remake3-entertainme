const TvSeries = require('../models/tvSeriesModel')

class tvSeriesController {
    static readTvSeries(req, res) {
        TvSeries.readTvSeries()
            .then(data => {
                return res.status(200).json({ 
                    tvSeries: data
                })
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static readTvSeriesById(req, res) {
        let { tvSeriesId } = req.params
        TvSeries.readTvSeriesById(tvSeriesId)
            .then(data => {
                return res.status(200).json({
                    tvSeries: data
                })
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static addTvSeries(req, res) {
        let { title, overview, poster_path, popularity, tags } = req.body
        let input = {
            title,
            overview,
            poster_path,
            popularity: Number(popularity),
            tags: tags.split(',')
        }
        TvSeries.addTvSeries(input)
            .then(data => {
                return res.status(201).json({
                    tvSeries: data.ops
                })
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }
}

module.exports = tvSeriesController