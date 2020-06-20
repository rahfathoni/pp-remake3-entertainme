const axios = require('axios')
const redis = require('../config/redis')
const BASE_URL_TVSERIES = 'http://localhost:3002'

class tvSeriesController {
    static async readTvSeries(req, res) {
        try {
            const tvSeriesCache = await redis.get('tvSeries')
            if(tvSeriesCache) {
                // console.log('---- ca tv') ///////
                res.status(200).json(JSON.parse(tvSeriesCache))
            }
            else {
                // console.log('-----query tv alone'); ////////////
                axios.get(`${BASE_URL_TVSERIES}/tvSeries`)
                    .then(({ data }) => {
                        redis.set('tvSeries', JSON.stringify(data))
                        return res.status(200).json(data)
                    })
                    .catch(err => {
                        return res.status(500).json(err)
                    })
            }
        } 
        catch (error) {
            return res.status(500).json(err)
        }
    }

    static readTvSeriesById(req, res) {
        let { tvSeriesId } = req.params
        axios.get(`${BASE_URL_TVSERIES}/tvSeries/${tvSeriesId}`)
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
        axios.post(`${BASE_URL_TVSERIES}/tvSeries`, input)
            .then(({ data }) => {
                redis.del('tvSeries')
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static deleteTvSeries(req, res) {
        let { tvSeriesId } = req.params
        axios.delete(`${BASE_URL_TVSERIES}/tvSeries/${tvSeriesId}`)
            .then(({ data }) => {
                redis.del('tvSeries')
                return res.status(200).json(data)
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
        axios.put(`${BASE_URL_TVSERIES}/tvSeries/${tvSeriesId}`, update)
            .then(({ data }) => {
                redis.del('tvSeries')
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