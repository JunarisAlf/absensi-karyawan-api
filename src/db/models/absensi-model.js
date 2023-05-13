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
        type: Date
   },
   checkOut: {
        type: Date
    },
    status: {
        required: true,
        type: String,
        enum: ['notOnTime', 'alpha', 'hadir', 'izin']
    }
}, {collection: "absensi"}))