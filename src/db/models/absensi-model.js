const mongoose = require('mongoose');
module.exports = mongoose.model('Absensi', new mongoose.Schema({
    datetime: {
        required: true,
        type: String
    },
    employeId: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String,
        enum: ['check-in', 'check-out', 'izin']
    }
}, {collection: "absensi"}))