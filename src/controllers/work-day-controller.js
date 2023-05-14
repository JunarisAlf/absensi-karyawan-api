const mongoose = require('mongoose');
const absensiModel = require("../db/models/absensi-model");
const izinRequestModel = require("../db/models/izin-request-model");
const userModel = require("../db/models/user-model")
const workDayModel = require("../db/models/work-day-model")
const moment = require('moment');

module.exports = class workDayController{
    static async create(req, res) {
        const date = req.body.date
        const start_time = moment(req.body.start_time, "DD-MM-YYYY HH:mm:ss").toDate()
        const end_time = moment(req.body.end_time, "DD-MM-YYYY HH:mm:ss").toDate()

        const workDay = new workDayModel({
            date,
            start_time,
            end_time
        })

        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                const izinRequest = await izinRequestModel.find({
                    startDate: {$lte: start_time},
                    endDate: {$gte: start_time},
                    status: 'approve'
                })
                const employes = await userModel.find({role: 'employe'})
                //check if employe have izin or not for today
                const absensi = employes.map(employe => {
                    let status = 'alpha'
                    izinRequest.forEach(req => {
                        if(req.employe == employe.number){
                            status = 'izin'
                        }
                    })
                    return {
                        workDay: date,
                        date: moment(date, 'DD-MM-YYYY').toDate(),
                        employe: employe.number,
                        checkIn: '',
                        checkOut: '',
                        status
                    }
                }) 
                //save workday
                await workDay.save()
                // //create and set all employe absensi for this work day to alpha
                await absensiModel.insertMany(absensi)
            });
            
            return res.status(201).json({
                message: "Work Day Created"
            })
        }
        catch (error) {
            console.error('Transaction failed. Error:', error);
            res.status(500).json({message: error.message})
        } finally {
            session.endSession();
        }
    }
    static async workDayHistory(req, res){
        try {
            const workDays = await workDayModel.find()
            const result = workDays.map(d => {
                return {
                    id:d._id,
                    date: d.date,
                    start_time: moment(d.start_time).format("DD-MM-YYYY HH:mm:ss"),
                    end_time: moment(d.end_time).format("DD-MM-YYYY HH:mm:ss"),
                }
            })
            res.status(200).json({
                message: "Succes geeting workday history!",
                data: result
            })
        } catch (error) {
            res.status(500).json({message: error.message})
            
        }
    }
}