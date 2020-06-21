const { gql } = require('apollo-server')
const axios = require('axios')
const redis = require('../config/redis')
const BASE_URL_TVSERIES = 'http://localhost:3002'

const typeDefs = gql`
  type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type messageTvSeries {
    message: String
  }

  input inputTvSeries {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }

  extend type Query {
    tvSeries: [TvSeries]
    tvSeriesById(tvSeriesId: ID!): TvSeries
  }

  extend type Mutation {
    addTvSeries(tvSeriesData: inputTvSeries): TvSeries
    updateTvSeries(tvSeriesId: ID!, tvSeriesData: inputTvSeries): messageTvSeries
    deleteTvSeries(tvSeriesId: ID!): messageTvSeries
  }
`;

const resolvers = {
    Query: {
        tvSeries: async () => {
            const tvSeriesCache = await redis.get('tvSeries')
            if(tvSeriesCache){
                // console.log('----cahce tvSeries')
                return JSON.parse(tvSeriesCache).tvSeries
            }
            else {
                // console.log('--query tvSeries')
                const { data } = await axios.get(`${BASE_URL_TVSERIES}/tvSeries`)
                await redis.set('tvSeries', JSON.stringify(data))
                return data.tvSeries
            }
        },
        tvSeriesById: async (_, args) => {
            const { tvSeriesId } = args
            const { data } = await axios.get(`${BASE_URL_TVSERIES}/tvSeries/${tvSeriesId}`)
            return data.tvSeries
        }
    },
    Mutation: {
        addTvSeries: async (_, args) => {
            const { tvSeriesData } = args
            const { data } = await axios.post(`${BASE_URL_TVSERIES}/tvSeries`, tvSeriesData)
            await redis.del('tvSeries')
            return data.tvSeries
        },
        updateTvSeries: async (_, args) => {
            // console.log(args.tvSeriesData)
            // console.log(args.tvSeriesId)
            const { tvSeriesId } = args
            const { tvSeriesData } = args
            const { data } = await axios.put(`${BASE_URL_TVSERIES}/tvSeries/${tvSeriesId}`, tvSeriesData)
            await redis.del('tvSeries')
            // console.log(data)
            return data
        },
        deleteTvSeries: async (_,args) => {
            // console.log('deleteeee')
            const { tvSeriesId } = args
            const { data } = await axios.delete(`${BASE_URL_TVSERIES}/tvSeries/${tvSeriesId}`)
            await redis.del('tvSeries')
            // console.log(data)
            return data
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}