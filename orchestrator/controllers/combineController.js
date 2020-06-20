const axios = require('axios')
const redis = require('../config/redis')
const BASE_URL_MOVIES = 'http://localhost:3001'
const BASE_URL_TVSERIES = 'http://localhost:3002'

class CombineController {
    static async readAllData (req, res) {
        try {
            const movieCache = await redis.get('movies')
            const tvSeriesCache = await redis.get('tvSeries')
            if(movieCache && !tvSeriesCache){  // ONLY MODIF IN TVSERIES, so cache tvseries deleted after modif, only need axios in tvsereis
                // console.log('-- no tv cache');
                // only axios from tvseries db, movie from available redis movie
                axios.get(`${BASE_URL_TVSERIES}/tvSeries`)   // TV SERIES
                    .then(({ data }) => {
                        redis.set('tvSeries', JSON.stringify(data))
                        return res.status(200).json({
                            movies: JSON.parse(movieCache).movies,
                            tvSeries: data.tvSeries
                        })
                    })
                    .catch(err => {                        
                        return res.status(500).json(err)
                    })
            }
            else if (tvSeriesCache && !movieCache) {  // ONLY MODIF IN MOVIES, so cache movies deleted after modif, only need axios in movies
                // console.log('-- no movie cache');
                // only axios from movies db, movie from available redis tvseries
                axios.get(`${BASE_URL_MOVIES}/movies`)  // MOVIES
                    .then(({ data }) => {
                        redis.set('movies', JSON.stringify(data))
                        return res.status(200).json({
                            movies: data.movies,
                            tvSeries: JSON.parse(tvSeriesCache).tvSeries
                        })
                    })
                    .catch(err => {                        
                        return res.status(500).json(err)
                    })
            }
            else if (tvSeriesCache && movieCache) { // all cache AVAILABLE
                // console.log('---all cahce avail');
                res.status(200).json({
                    movies: JSON.parse(movieCache).movies,
                    tvSeries: JSON.parse(tvSeriesCache).tvSeries
                })
            }
            else {
                // console.log('-----query'); ////////////
                axios.all([
                    axios.get(`${BASE_URL_MOVIES}/movies`),
                    axios.get(`${BASE_URL_TVSERIES}/tvSeries`)
                ])
                    .then(axios.spread((movies, tvSeries) => {
                        redis.set('movies', JSON.stringify(movies.data))
                        redis.set('tvSeries', JSON.stringify(tvSeries.data))
                        return res.status(200).json({
                            movies: movies.data.movies,
                            tvSeries: tvSeries.data.tvSeries
                        })
                    }))
                    .catch(err => {
                         return res.status(500).json(err)
                    })
            } 
        } 
        catch (err) {
            return res.status(500).json(err)
        }
    }

    // personal note, without redis
    // static readAllData (req, res) {
    //     axios.all([
    //         axios.get(`${BASE_URL_MOVIES}/movies`),
    //         axios.get(`${BASE_URL_TVSERIES}/tvSeries`)
    //     ])
    //          .then(axios.spread((movies, tvSeries) => {
    //              return res.status(200).json({
    //                  movies: movies.data.movies,
    //                  tvSeries: tvSeries.data.tvSeries
    //              })
    //          }))
    //          .catch(err => {
    //              return res.status(500).json(err)
    //          })
    // }
}

module.exports = CombineController