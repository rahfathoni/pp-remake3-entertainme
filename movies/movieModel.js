const { database } = require('./config/mongo');
const { ObjectId } = require('mongodb')

const db = database();
const movie = db.collection('Movies');

class Movie {
    static readMovies() {
        return movie.find({}).toArray()
    }

    static readMovieById(movieId) {
        return movie.findOne({ _id: ObjectId(movieId) })
    }

    static addMovie(newMovie) {
        return movie.insertOne(newMovie)
    }

    static deleteMovie(movieId) {
        return movie.deleteOne({ _id: ObjectId(movieId) })
    }

    static updateMovie(movieId, updateMovie) {
        return movie.updateOne(
            { _id: ObjectId(movieId) },
            { $set: updateMovie }
        )
    }
}

module.exports = Movie