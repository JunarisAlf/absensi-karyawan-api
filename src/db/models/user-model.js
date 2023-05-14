const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
    number: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    fullName: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String,
        enum: ['employe', 'admin']
    }
}, {collection: 'users'}))