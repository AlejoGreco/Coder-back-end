import userService from '../services/userService.js'
import logger from "../logger/index.js";

class UserController {
    constructor(){
        this.service = userService
    }

    registerUser = async (req, res) => {
        const result = await this.service.registerUser(req.user)
        res.send({status: 'success', message: 'User created!', userId: req.user.id})
    }

    loginUser = async (req, res) => {
        logger.info(req.user)
        res.send({status: 'success', message: 'User logged in!', userId: req.user.id})
    }

    logoutUser = async (req, res) => {
        const id = req.user.id
        req.logout(e => {
            if(e) {
                logger.error(e)
                res.send({error: e})
            }
            res.send({status: 'success', message: 'User logged out!', userId: id})
        })
    }

    infoUser = async (req, res) => {
        const {_id, __v, password, ...user} = req.user._doc
        res.send({user})
    }
}

export default new UserController()