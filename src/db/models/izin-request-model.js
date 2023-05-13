const mongoose = require('mongoose');
module.exports = mongoose.model('IzinRequest', new mongoose.Schema({
    employe: {
        required: true,
        type: String,
        ref: 'User'
    },
    requestDate: {
        required: true,
        type: Date,
    },
    note: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String,
        enum: ['processed', 'reject', 'approve']
    },
    submissionDate: {
        required: true,
        type: Date,
    },
    isDone: {
        required: true,
        type: Boolean
    }
}, {collection: 'izinRequests'}))