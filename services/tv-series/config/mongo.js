const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'entertain-me';

let db;
const client = new MongoClient(url, { useUnifiedTopology: true });

function connect(callback) {
    client.connect(function(error) {
        if (error) {
            console.log("Failed connect to mongoDB");
        }
        else {
            console.log('Success connect to mongoDB');
            db = client.db(dbName)
        }
        callback(error)
    })
}

function database() {
    return db;
}

module.exports = {
    connect,
    database
}