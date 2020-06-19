const axios = require('axios')
const BASE_URL = 'http://localhost:3001'

class MovieController {
    static readMovies(req, res) {
        axios.get(`${BASE_URL}/movies`)
            .then(({ data }) => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static readMovieById(req, res) {
        let { movieId } = req.params
        axios.get(`${BASE_URL}/movies/${movieId}`)
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
        axios.post(`${BASE_URL}/movies`, input)
            .then(({ data }) => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static deleteMovie(req, res) {
        let { movieId } = req.params
        axios.delete(`${BASE_URL}/movies/${movieId}`)
            .then(({ data }) => {
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
        axios.put(`${BASE_URL}/movies/${movieId}`, update)
            .then(({ data }) => {
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