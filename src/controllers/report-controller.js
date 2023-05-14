const userModel = require("../db/models/user-model")
const moment = require("moment/moment")

module.exports = class reportController{
    static async getReport(req, res){
        let {start_date, end_date} = req.query
        start_date = moment(start_date, "DD-MM-YYYY").toDate()
        end_date = moment(end_date, "DD-MM-YYYY").toDate()

        try {
            userModel.aggregate([
                { $match: {role: 'employe'} },
                {
                  $lookup: {
                    from: 'absensi',
                    localField: 'number',
                    foreignField: 'employe',
                    as: 'absensi'
                  }
                },
                {
                    $lookup: {
                        from: 'izinRequests',
                        localField: 'number',
                        foreignField: 'employe',
                        as: 'izinRequests'
                      } 
                },
                {
                  $project: {
                    fullName: 1,
                    number: 1,
                    hadir: {
                      $size: {
                        $filter: {
                          input: '$absensi',
                          as: 'abs',
                          cond: { 
                            $and: [
                                { $eq: ['$$abs.status', 'hadir']},
                                { $gte: ['$$abs.date', start_date] },
                                { $lte: ['$$abs.date', end_date] }
                            ]
                        }
                        }
                      }
                    },
                    alpha: {
                        $size: {
                          $filter: {
                            input: '$absensi',
                            as: 'abs',
                            cond: { 
                                $and: [
                                    {$eq: ['$$abs.status', 'alpha']},
                                    { $gte: ['$$abs.date', start_date] },
                                    { $lte: ['$$abs.date', end_date] }
                                ]
                            }
                          }
                        }
                    },
                    notOnTime: {
                        $size: {
                          $filter: {
                            input: '$absensi',
                            as: 'abs',
                            cond: { 
                                $and: [
                                    {$eq: ['$$abs.status', 'notOnTime']},
                                    { $gte: ['$$abs.date', start_date] },
                                    { $lte: ['$$abs.date', end_date] }
                                ]
                            }
                          }
                        }
                      },
                    izin: {
                        $size: {
                          $filter: {
                            input: '$absensi',
                            as: 'abs',
                            cond: { 
                                $and: [
                                    {$eq: ['$$abs.status', 'izin']},
                                    { $gte: ['$$abs.date', start_date] },
                                    { $lte: ['$$abs.date', end_date] }
                                ]
                            }
                          }
                        }
                    },
                    rejected: {
                        $size: {
                          $filter: {
                            input: '$izinRequests',
                            as: 'req',
                            cond: { 
                                $and: [
                                    { $eq: ['$$req.status', 'reject']},
                                    { $gte: ['$$req.startDate', start_date] },
                                    { $lte: ['$$req.startDate', end_date] }
                                ]
                            }
                          }
                        }
                    },
                  }
                }
              ])
              .then((result) => {
                res.status(200).json({
                    message: "Success Generate Report",
                    data: result
                });
              })
              .catch((error) => {
                res.status(500).json(error)
              });
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}