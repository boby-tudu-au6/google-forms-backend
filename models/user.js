const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    token: String,
})

module.exports = model('user', userSchema)