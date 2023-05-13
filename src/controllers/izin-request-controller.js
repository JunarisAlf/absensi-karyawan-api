
const izinRequestModel = require("../db/models/izin-request-model")
const userModel = require("../db/models/user-model")

module.exports = class izinRequestController{
    static async create(req, res){
        const {request_date, note} = req.body
        const employe = req.user.number
        const submissionDate = Date.now()
        try{
            const {fullName} = await userModel.findOne({number: employe})
            new izinRequestModel({
                employe,
                fullName,
                requestDate: Date(request_date),
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
    static async changeStatus(req, res){
        
    }
}