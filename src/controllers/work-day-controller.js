const absensiModel = require("../db/models/absensi-model");
const userModel = require("../db/models/user-model")
const workDayModel = require("../db/models/work-day-model")
const moment = require('moment');

module.exports = class workDayController{
    static async create(req, res) {
        // const {date, start_time, end_time} = req.body
        const date = req.body.date
        const start_time = moment(req.body.start_time, "DD-MM-YYYY HH:mm:ss").toDate()
        const end_time = moment(req.body.end_time, "DD-MM-YYYY HH:mm:ss").toDate()
        const workDay = new workDayModel({
            date,
            start_time,
            end_time
        })
        try {
            const employes = await userModel.find({role: 'employe'})
            const absensi = employes.map(employe => {
                return {
                    date,
                    employe: employe.number,
                    checkIn: Date.now(),
                    checkOut: Date.now(),
                    status: 'alpha'
                }
            }) 
            const savedWorkDay = await workDay.save()
            await absensiModel.insertMany(absensi)
            //check request
            return res.status(201).json({
                message: "Work Day Created"
            })
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}