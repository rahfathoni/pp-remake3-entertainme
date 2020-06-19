const { database } = require('../config/mongo');
const { ObjectId } = require('mongodb')

const db = database();
const tvSeries = db.collection('TvSeries');

class TvSeries {
    static readTvSeries() {
        return tvSeries.find({}).toArray()
    }

    static readTvSeriesById(tvSeriesId) {
        return tvSeries.findOne({ _id: ObjectId(tvSeriesId)})
    }

    static addTvSeries(newTvSeries) {
        return tvSeries.insertOne(newTvSeries)
    }

    static deleteTvSeries(tvSeriesId) {
        return tvSeries.deleteOne({ _id: ObjectId(tvSeriesId) })
    }
    
}

module.exports = TvSeries