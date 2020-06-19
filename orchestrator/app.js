const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')

const { connect } = require('./config/mongo')
connect((err) => {
    if(!err){
        app.use(cors())
        app.use(express.urlencoded({extended: false}));
        app.use(express.json());
        app.use('/', require('./routes/index'))
        app.listen(PORT, () => {
            console.log(`EntertainMe working on port: ${PORT}`)
        })
    }
})
