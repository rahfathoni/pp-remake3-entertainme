const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const cors = require('cors')

const { connect } = require('./config/mongo')
connect((err) => {
    if(!err){
        app.use(cors())
        app.use(express.urlencoded({extended: false}));
        app.use(express.json());
        app.use('/tvSeries', require('./tvSeriesRouter'))
        app.listen(PORT, () => {
            console.log(`TvSeries working on port: ${PORT}`)
        })
    }
})
