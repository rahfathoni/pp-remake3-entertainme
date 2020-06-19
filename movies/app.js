const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors')

const { connect } = require('./config/mongo')
connect((err) => {
    if(!err){
        app.use(cors())
        app.use(express.urlencoded({extended: false}));
        app.use(express.json());
        app.use('/movies', require('./movieRouter'))
        app.listen(PORT, () => {
            console.log(`Movies working on port: ${PORT}`)
        })
    }
})
