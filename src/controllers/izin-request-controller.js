
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
                startDate: moment(start_date, 'DD-MM-YYYY').startOf('Day').toDate(),
                endDate: moment(end_date, 'DD-MM-YYYY').endOf('Day').toDate(),
                note,
                status: 'processed',
                submissionDate,
            }).save()
            return res.status(201).json({message: "Request has been send and processed!"})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }
    static async update(req, res){
        const {start_date, end_date, note} = req.body
        const id = req.params.id
        try{
            const izinRequest = await izinRequestModel.findOne({_id: id})

            if(izinRequest.status != 'processed') return res.status(400).json({message: "Can't update, because has been processed by admin"})
            //if status still 'processed' do updated
            await izinRequestModel.updateOne({_id: id}, {
                startDate: moment(start_date, 'DD-MM-YY'),
                endDate: moment(end_date, 'DD-MM-YY'),
                note,
            })
            return res.status(201).json({message: "Request has been updated"})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }
    static async delete(req, res){
        const id = req.params.id
        try {
            const izinRequest = await izinRequestModel.findOne({_id: id})
            if(izinRequest.status != 'processed') return res.status(400).json({message: "Can't delete, because has been processed by admin"})

            await izinRequestModel.deleteOne({_id: id})
            res.status(200).json({message: "Delete success!"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
    static async getAllRequest(req, res){
        try{
            let izinRequest;
            if(req.user.role == 'employe'){
                izinRequest = await izinRequestModel.find({employe: req.user.number})
                console.log(req.user.number)
            }else{
                izinRequest = await izinRequestModel.find()
            }
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
            await izinRequestModel.updateOne({_id: id}, {status})
            return res.status(200).json({message: "Success change status to "+status})
        }catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}