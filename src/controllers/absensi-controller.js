const moment = require("moment/moment")
const workDay = require("../db/models/work-day-model")
const AbsensiModel = require("../db/models/absensi-model")
const UserModel = require('../db/models/user-model')

module.exports = class absensiController{
    static async checkIn(req, res){
        const {datetime, workDay} = req.body
        const {_id} = await UserModel.findOne({number: req.user.number}).select('_id')
        const absensi = new AbsensiModel({
            datetime,
            type: 'check-in',
            employeId: _id,
            workDay
        })
        try {
            const dataToSave = await absensi.save();
            res.status(201).json({
                message: "Check In Succes!"
            })
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}