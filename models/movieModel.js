const { database } = require('../config/mongo');
const { ObjectId } = require('mongodb')

const db = database();
const movie = db.collection('Movies');

class MovieModel {
    static readMovies() {
        return movie.find({}).toArray()
    }

    static readMovieById(movieId) {
        return movie.findOne({ _id: ObjectId(movieId)})
    }
}

module.exports = MovieModel