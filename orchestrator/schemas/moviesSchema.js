const { gql } = require('apollo-server')
const axios = require('axios')
const redis = require('../config/redis')
const BASE_URL_MOVIES = 'http://localhost:3001'

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type messageMovies {
    message: String
  }

  input inputMovies {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }

  extend type Query {
    movies: [Movie]
    movieById(movieId: ID!): Movie
  }

  extend type Mutation {
    addMovie(movieData: inputMovies): Movie
    updateMovie(movieId: ID!, movieData: inputMovies): messageMovies
    deleteMovie(movieId: ID!): messageMovies
  }
`;

const resolvers = {
    Query: {
        movies: async () => {
            const moviesCache = await redis.get('movies')
            if(moviesCache){
                // console.log('----cahce movie')
                return JSON.parse(moviesCache).movies
            }
            else {
                // console.log('--query movie')
                const { data } = await axios.get(`${BASE_URL_MOVIES}/movies`)
                await redis.set('movies', JSON.stringify(data))
                return data.movies
            }
        },
        // look in doc about arguments in resolvers
        movieById: async (_, args) => {
            const { movieId } = args
            const { data } = await axios.get(`${BASE_URL_MOVIES}/movies/${movieId}`)
            return data.movie
        }
    },
    Mutation: {
        addMovie: async (_, args) => {
            const { movieData } = args
            const { data } = await axios.post(`${BASE_URL_MOVIES}/movies`, movieData)
            await redis.del('movies')
            return data.movie
        },
        updateMovie: async (_, args) => {
            // console.log(args.movieData)
            // console.log(args.movieId)
            const { movieId } = args
            const { movieData } = args
            const { data } = await axios.put(`${BASE_URL_MOVIES}/movies/${movieId}`, movieData)
            await redis.del('movies')
            // console.log(data)
            return data
        },
        deleteMovie: async (_,args) => {
            // console.log('deleteeee')
            const { movieId } = args
            const { data } = await axios.delete(`${BASE_URL_MOVIES}/movies/${movieId}`)
            await redis.del('movies')
            // console.log(data)
            return data
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}