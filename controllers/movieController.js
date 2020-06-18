const MovieModel = require('../models/movieModel')

class MovieController {
    static async readMovies(req, res) {
        // readMovies bellow from model
        const movies = await MovieModel.readMovies();
        return res.status(200).json(movies)
    }
}

module.exports = MovieController