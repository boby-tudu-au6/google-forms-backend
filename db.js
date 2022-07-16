require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true,useUnifiedTopology: true })
    .then(conn =>{
        console.log('Database connected succesfully')
    }).catch(err =>{console.log(err.message)})
