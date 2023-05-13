const workDay = require("../db/models/work-day-model")

module.exports = class workDayController{
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
}