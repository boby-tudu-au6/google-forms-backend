const { Schema, model } = require('mongoose')

const formSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    designation: String,
    experience_year: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = model('form', formSchema)