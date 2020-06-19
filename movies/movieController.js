const Movie = require('./movieModel')

class MovieController {
    // cara 1
    static readMovies(req, res) {
       Movie.readMovies()
            .then(data => {
                return res.status(200).json({ 
                    movies: data,
                })
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static readMovieById(req, res) {
        let { movieId } = req.params
        Movie.readMovieById(movieId)
            .then(data => {
                return res.status(200).json({
                    movie: data
                })
            })
            .catch(err => {
                return res.status(500).json(err)
            })
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
        Movie.addMovie(input)
            .then(data => {
                return res.status(201).json({
                    movie: data.ops
                })
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static deleteMovie(req, res) {
        let { movieId } = req.params
        Movie.deleteMovie(movieId)
            .then(data => {
                if(data.deletedCount === 0){
                    return res.status(404).json({
                        message: 'Document in Movies not found'
                    })
                }
                else {
                    return res.status(200).json({
                        message: 'Delete Document in Movies Success'
                    })
                }
            })
            .catch(err => {
                return res.status(500).json(err)
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
        Movie.updateMovie(movieId, update)
            .then(data => {
                if(data.result.n === 0) {
                    return res.status(404).json({
                        message: 'Document in Movies not found'
                    })
                }
                else {
                    return res.status(201).json({
                        message: 'Update Document in Movies Success'
                    })
                }
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }
    // catatan pribadi
    // cara 2 dengna async
    // static async readMovies(req, res) {
    //     try {
    //         // readMovies bellow from model
    //         const movies = await Movie.readMovies();
    //         return res.status(200).json(movies)
    //     } catch (err) {
    //         return res.status(500).json(err)
    //     }
    // }
    // static async readMovieById(req, res) {
    //     let { movieId } = req.params
    //     try {
    //         const movie = await Movie.readMovieById(movieId);
    //         return res.status(200).json(movie)    
    //     } catch (err) {
    //         return res.status(500).json(err)
    //     }
    // }
    // static async addMovie(req, res) {
    //     let { title, overview, poster_path, popularity, tags } = req.body
    //     let input = {
    //         title,
    //         overview,
    //         poster_path,
    //         popularity: Number(popularity),
    //         tags: tags.split(',')
    //     }
    //     try {
    //         const movie = await MovieModel.addMovie(input)
    //     } catch (err) {
    //         return res.status(500).json(err)
    //     }
    // }
}

module.exports = MovieController