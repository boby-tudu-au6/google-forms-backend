require('./db');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const userRoutes = require('./routes/userRoutes')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log('server running'));
