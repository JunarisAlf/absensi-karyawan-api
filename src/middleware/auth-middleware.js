const jwt = require('jsonwebtoken');
const User = require('../db/models/user-model')

module.exports = async function(req, res, next) {
    try {
        const {authorization} = req.headers;
        if (!authorization) return res.status(400).json({message: "Invalid Token!"});
        token = authorization.split('Bearer ');
        if (token.length !== 2) return res.status(400).json({message: "Invalid Token!"});

        const {number, role} = jwt.verify(token[1], process.env.SECRET_KEY);
        const user = await User.findOne({number: number}).exec()
        if (!user) return res.status(401).json({message: "Unauthorized!"});
        req.user = {number, role};
        next();
    } catch (err) {
        next(err);
    }
};