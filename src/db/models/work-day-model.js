const mongoose = require('mongoose');
module.exports = mongoose.model('WorkDay', new mongoose.Schema({
    date: {
        required: true,
        unique: true,
        type: String
    },
    start_time: {
        required: true,
        type: Date
    },
    end_time: {
        required: true,
        type: Date
    }
}, {collection: "workDays"}))