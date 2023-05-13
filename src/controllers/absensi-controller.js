const moment = require("moment/moment")
const workDay = require("../db/models/work-day-model")
const Absensi = require("../db/models/absensi-model")
const User = require('../db/models/user-model')

module.exports = class absensiController{
    static async create(req, res) {
        const {date, start_time, end_time} = req.body
        const data = new workDay({
            date,
            start_time,
            end_time
        })
        try {
            const dataToSave = await data.save();
            res.status(201).json({
                message: "Work Day Created"
            })
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    static async checkIn(req, res){
        const {datetime} = req.body
        const {_id} = await User.findOne({number: req.user.number}).select('_id')
        const data = new Absensi({
            datetime,
            type: 'check-in',
            employeId: _id
        })
        try {
            const dataToSave = await data.save();
            res.status(201).json({
                message: "Check In Succes!"
            })
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}