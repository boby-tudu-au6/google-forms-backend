const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    phone: String,
    designation: String,
    password: String,
    token: String,
    age: String
});

module.exports = model('user', userSchema)