
const moment = require("moment/moment")
const izinRequestModel = require("../db/models/izin-request-model")
const userModel = require("../db/models/user-model")

module.exports = class izinRequestController{
    static async create(req, res){
        const {start_date, end_date, note} = req.body
        const employe = req.user.number
        const submissionDate = Date.now()
        try{
            const {fullName} = await userModel.findOne({number: employe})
            new izinRequestModel({
                employe,
                fullName,
                startDate: moment(start_date, 'DD-MM-YY'),
                endDate: moment(end_date, 'DD-MM-YY'),
                note,
                status: 'processed',
                submissionDate,
                isDone: false
            }).save()
            return res.status(201).json({message: "Request has been send and processed!"})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }
    static async getAllRequest(req, res){
        try{
            const izinRequest = await izinRequestModel.find()
            return res.status(200).json({
                message: "Success geting all request!",
                data: izinRequest
            })
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }
  
    static async getOneRequest(req, res){
        const id = req.params.id
        try{
            const izinRequest = await izinRequestModel.findOne({_id: id})
            return res.status(200).json({
                message: "Success geting data!",
                data: izinRequest
            })
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }
    static async changeStatus(req, res){
        const id = req.params.id
        const status = req.body.isApproved ? 'approve' : 'reject'
        try {
            const izinRequest = await izinRequestModel.findOneAndUpdate({_id: id}, {status})
            return res.status(200).json({message: "Success change status to "+status})
        }catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}