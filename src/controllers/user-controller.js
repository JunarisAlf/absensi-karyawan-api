const User = require('../db/models/user-model')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = class UserController{
    static async createAdmin(req, res){
        const {number, fullName, password} = req.body
        const data = new User({
            number: number,
            fullName: fullName,
            password: await bcrypt.hash(password, 10),
            role: 'admin'
        })
        try {
            const dataToSave = await data.save();
            res.status(201).json({
                message: "User created!"
            })
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    static async createEmploye(req, res){
        const {number, fullName, password} = req.body
        const data = new User({
            number: number,
            fullName: fullName,
            password: await bcrypt.hash(password, 10),
            role: 'employe'
        })
        try {
            const dataToSave = await data.save();
            res.status(201).json({
                message: "User created!"
            })
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }

    static async login(req, res){
        const {number, password} = req.body
        const logedUser = await User.findOne({number: number}).exec()
        if(!logedUser){
            return res.status(400).json({message: "User Not Found!"})
        }
        const match = await bcrypt.compare(password, logedUser.password);
        if(!match) {
            return res.status(400).json({message: "Wrong Password!"})
        }
        return res.status(200).json({
            message: "Login Success!",
            jwt: jwt.sign({number: number, role: logedUser.role}, process.env.SECRET_KEY, { expiresIn: '1h' })
        })

    }
}