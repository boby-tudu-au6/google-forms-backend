require('./db');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const userRoutes = require('./routes/user.route')
const formRoutes = require('./routes/form.route')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoutes)
app.use('/form', formRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log('server running'));
