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
        const absensi = await AbsensiModel.findOne({employe, workDay: date})
        if(absensi.checkIn != null || absensi.status == 'izin') return res.status(400).json({message: "Can't CheckIn Because You Already CheckIn or Izin"}) 

        try {
            await AbsensiModel.updateOne({employe, workDay: date}, {
                checkIn: checkInTime,
            })
            res.status(201).json({
                message: "Check In Succes!"
            })
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    
    static async checkOut(req, res){
        const {date} = req.body        
        const employe = req.user.number
        const absensiDate = moment(req.body.date, "DD-MM-YYYY HH:mm:ss")
        const checkOutTime = moment(req.body.datetime, "DD-MM-YYYY HH:mm:ss")

        //check if absensi do on the same day with date
        const isSameDate = absensiDate.format('DD-MM-YYYY') === checkOutTime.format('DD-MM-YYYY');
        if (!isSameDate) return res.status(400).json({message: "Out Of Date!"})
       
        //check if user already checkIn or not
        const absensi = await AbsensiModel.findOne({employe, workDay: date})
        if(absensi.checkIn == null ) return res.status(400).json({message: "You are not check in yet!"}) //check in before checkout
        //check if user already checkOut or not
        if(absensi.checkOut != null ) return res.status(400).json({message: "You are already check out!"})

        //check late or early
        let status = ''
        const workDay = await workDayModel.findOne({date})
        const start_time = moment(workDay.start_time, "DD-MM-YYYY HH:mm:ss")
        const end_time = moment(workDay.end_time, "DD-MM-YYYY HH:mm:ss")
        const checkInTime = moment(absensi.checkIn)

        const isLateCheckIn = checkInTime.isAfter(start_time) // late or not?
        const isEarlyCheckOut = checkOutTime.isBefore(end_time) // go home early or not?
        status = isLateCheckIn || isEarlyCheckOut ? 'notOnTime' : 'hadir'
        try {
            await AbsensiModel.updateOne({employe, workDay: date}, {
                checkOut: checkOutTime,
                status
            })
            res.status(201).json({
                message: "Check Out Succes!"
            })
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }
    }
    static async history(req, res){
        try {
            const absensi = await AbsensiModel.find({employe: req.user.number})
            const result = absensi.map(abs => {
                return{
                    id: abs._id,
                    workDay: abs.workDay,
                    checkIn: moment(abs.checkIn).format("DD-MM-YYYY HH:mm:ss"),
                    checkOut: moment(abs.checkOut).format("DD-MM-YYYY HH:mm:ss"),
                    status: abs.status
                }
            })
            res.status(200).json({
                message: "Success get absensi history!",
                data: result
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}