const moment = require("moment/moment")
const workDay = require("../db/models/work-day-model")
const AbsensiModel = require("../db/models/absensi-model")
const UserModel = require('../db/models/user-model')
const workDayModel = require("../db/models/work-day-model")

module.exports = class absensiController{
    static async checkIn(req, res){
        const {date} = req.body        
        const employe = req.user.number
        const absensiDate = moment(req.body.date, "DD-MM-YYYY HH:mm:ss")
        const checkInTime = moment(req.body.datetime, "DD-MM-YYYY HH:mm:ss")

        //check if absensi do on the same day with date
        const isSameDate = absensiDate.format('DD-MM-YYYY') === checkInTime.format('DD-MM-YYYY');
        if (!isSameDate) return res.status(400).json({message: "Out Of Date!"})
       
        //check if user already absensi or not
        const absensi = await AbsensiModel.findOne({employe, date})
        if(absensi.status != 'alpha') return res.status(400).json({message: "You only can absensi once!"}) //'alpha' is default value
        
        //check late or not
        const workDay = await workDayModel.findOne({date})
        const start_time = moment(workDay.start_time, "DD-MM-YYYY HH:mm:ss")
        const isLate = checkInTime.isAfter(start_time)
        const status = isLate ? 'notOnTime' : 'hadir'
        try {
            await AbsensiModel.updateOne({employe, date}, {
                checkIn: checkInTime,
                status
            })
            console.log(absensi)
            res.status(201).json({
                message: "Check In Succes! on"
            })
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}