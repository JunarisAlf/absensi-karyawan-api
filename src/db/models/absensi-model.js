const mongoose = require('mongoose');
module.exports = mongoose.model('Absensi', new mongoose.Schema({
    date: {
        required: true,
        type: String,
        ref: 'DayWork'
    },
    employe: {
        required: true,
        type: String,
        ref: 'User'
    },
   checkIn: {
        required: true,
        type: Date
   },
   checkOut: {
        required: true,
        type: Date
    },
    status: {
        required: true,
        type: String,
        enum: ['notOnTime', 'alpha', 'hadir', 'izin']
    }
}, {collection: "absensi"}))