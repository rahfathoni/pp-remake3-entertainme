const axios = require('axios')
const BASE_URL = 'http://localhost:3002'

class tvSeriesController {
    static readTvSeries(req, res) {
        axios.get(`${BASE_URL}/tvSeries`)
            .then(({ data }) => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static readTvSeriesById(req, res) {
        let { tvSeriesId } = req.params
        axios.get(`${BASE_URL}/tvSeries/${tvSeriesId}`)
            .then(({ data }) => {
                return res.status(200).json(data)
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
            popularity,
            tags
        }
        axios.post(`${BASE_URL}/tvSeries`, input)
            .then(({ data }) => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static deleteTvSeries(req, res) {
        let { tvSeriesId } = req.params
        axios.delete(`${BASE_URL}/tvSeries/${tvSeriesId}`)
            .then(({ data }) => {
                return res.status(200).json({data})
            })
            .catch(err => {
                if(err.message === 'Request failed with status code 404'){
                    return res.status(404).json({
                        message: 'Document in TvSeries not found'
                    })
                }
                else {
                    return res.status(500).json(err)
                }
            })
    }

    static updateTvSeries(req, res) {
        let { tvSeriesId } = req.params
        let { title, overview, poster_path, popularity, tags } = req.body
        let update = {
            title,
            overview,
            poster_path,
            popularity,
            tags
        }
        axios.put(`${BASE_URL}/tvSeries/${tvSeriesId}`, update)
            .then(({ data }) => {
                return res.status(201).json(data)
            })
            .catch(err => {
                if(err.message === 'Request failed with status code 404'){
                    return res.status(404).json({
                        message: 'Document in TvSeries not found'
                    })
                }
                else {
                    return res.status(500).json(err)
                }
            })
    }
}

module.exports = tvSeriesController