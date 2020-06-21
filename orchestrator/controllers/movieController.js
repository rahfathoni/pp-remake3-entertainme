const axios = require('axios')
const redis = require('../config/redis')
const BASE_URL_MOVIES = 'http://localhost:3001'

class MovieController {
    static async readMovies(req, res) {
        try {
            const moviesCache = await redis.get('movies')
            if(moviesCache){
                // console.log('---ca movie') /////////////
                res.status(200).json(JSON.parse(moviesCache))
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

    static async readMovieById(req, res) {
        let { movieId } = req.params
        try {
            const moviesCache = await redis.get('movies');
            if(moviesCache){
                // console.log('---id--find movie cache')
                let arrayMovies = JSON.parse(moviesCache).movies
                for (let i = 0; i < arrayMovies.length;i++){
                    if(arrayMovies[i]._id === movieId){
                        return res.status(200).json({
                            movie: arrayMovies[i]
                        })
                    }
                }
                return res.status(200).json({movie: null})
            }
            else {
                // console.log('---db movie')
                axios.get(`${BASE_URL_MOVIES}/movies/${movieId}`)
                    .then(({ data }) => {
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
        // if no need to find in redist
        // axios.get(`${BASE_URL_MOVIES}/movies/${movieId}`)
        //     .then(({ data }) => {
        //         return res.status(200).json(data)
        //     })
        //     .catch(err => {
        //         return res.status(500).json(err)
        //     })
    }

    static addMovie(req, res) {
        let { title, overview, poster_path, popularity, tags } = req.body
        let input = {
            title,
            overview,
            poster_path,
            popularity: Number(popularity),
            tags: tags.split(',')
        }
        // input already in correct data type before send to microservices
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
            popularity: Number(popularity),
            tags: tags.split(',')
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