const mongoose = require('mongoose');
module.exports = mongoose.model('Absensi', new mongoose.Schema({
    workDay: {
        required: true,
        type: String,
        ref: 'WorkDay'
    },
    date: {
        required: true,
        type: Date
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