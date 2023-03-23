import userService from '../services/userService.js'
import ErrorDto from '../dtos/ErrorDto.js';
import logger from "../logger/index.js";
import UserDto from '../dtos/UserDto.js';

class UserController {
    constructor(){
        this.service = userService
    }

    registerUser = async (req, res) => {
        try{
            const result = await this.service.registerUser(req.user)
            res.send({message: 'User created!', userId: req.user.id})
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: registerUser`, 400, 900)
            return res.status(status).send(rest)
        }
    }

    loginUser = async (req, res) => {
        try{
            logger.info(req.user)
            res.send({ message: 'User logged in!', userId: req.user.id})
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: loginUser`, 400, 910)
            return res.status(status).send(rest)
        }
    }

    logoutUser = async (req, res) => {
        try{
            const id = req.user.id
            req.logout(e => {
                if(e) {
                    logger.error(e)
                    return res.send({error: e})
                }
                res.send({message: 'User logged out!', userId: id})
            })
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: logoutUser`, 400, 920)
            return res.status(status).send(rest)
        }
    }

    infoUser = async (req, res) => {
        try{
            const user = new UserDto(req.user._doc)
            res.send({user})
        }
        catch (e){
            if(e.status){
                const {status, ...rest} = e
                return res.status(status).send(rest)
            }
            const {status, ...rest} = new ErrorDto({params: {}, app: e}, `Method: ${req.method} - Endpoint: ${req.path} | Controller: infoUser`, 400, 930)
            return res.status(status).send(rest)
        }
    }
}

export default new UserController()