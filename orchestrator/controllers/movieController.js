const axios = require('axios')
const redis = require('../config/redis')
const BASE_URL_MOVIES = 'http://localhost:3001'

class MovieController {
    static async readMovies(req, res) {
        try {
            const movieCache = await redis.get('movies')
            if(movieCache){
                // console.log('---ca movie') /////////////
                res.status(200).json(JSON.parse(movieCache))
            }
            else {
                // console.log('-----query movie alone'); ////////////
                axios.get(`${BASE_URL_MOVIES}/movies`)
                    .then(({ data }) => {
                        redis.set('movies', JSON.stringify(data))
                        return res.status(200).json(data)
                    })
                    .catch(err => {                        
                        return res.status(500).json(err)
                    })
            }
            
        } 
        catch (err) {
            return res.status(500).json(err)
        }
    }

    static readMovieById(req, res) {
        // no need redis, because cant get spesific item from redis
        let { movieId } = req.params
        axios.get(`${BASE_URL_MOVIES}/movies/${movieId}`)
            .then(({ data }) => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static addMovie(req, res) {
        let { title, overview, poster_path, popularity, tags } = req.body
        // input real value from client, fixing input in microservices
        let input = {
            title,
            overview,
            poster_path,
            popularity,
            tags
        }
        // input already in object as req.body to movie microservices
        axios.post(`${BASE_URL_MOVIES}/movies`, input)
            .then(({ data }) => {
                // need to del moviecache every add/update/del (modification) in cache
                redis.del('movies')
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static deleteMovie(req, res) {
        let { movieId } = req.params
        axios.delete(`${BASE_URL_MOVIES}/movies/${movieId}`)
            .then(({ data }) => {
                redis.del('movies')
                return res.status(200).json({data})
            })
            .catch(err => {
                if(err.message === 'Request failed with status code 404'){
                    return res.status(404).json({
                        message: 'Document in Movies not found'
                    })
                }
                else {
                    return res.status(500).json(err)
                }
            })
    }

    static updateMovie(req, res) {
        let { movieId } = req.params
        let { title, overview, poster_path, popularity, tags } = req.body
        let update = {
            title,
            overview,
            poster_path,
            popularity,
            tags
        }
        axios.put(`${BASE_URL_MOVIES}/movies/${movieId}`, update)
            .then(({ data }) => {
                redis.del('movies')
                return res.status(201).json(data)
            })
            .catch(err => {
                if(err.message === 'Request failed with status code 404'){
                    return res.status(404).json({
                        message: 'Document in Movies not found'
                    })
                }
                else {
                    return res.status(500).json(err)
                }
            })
    }
}

module.exports = MovieController