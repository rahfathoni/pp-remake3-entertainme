const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')

// orchestrator no need to involve directly with db
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', require('./routes/index'))
app.listen(PORT, () => {
    console.log(`Orchestrator on port: ${PORT}`)
})
