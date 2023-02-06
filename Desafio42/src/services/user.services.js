import { createHash, isValid } from "../utils/bcrypt.js"
import DaosFactory from "../daos/daosFactory.js"
import { PERSISTENCE } from "../config/cloud.js"

const userDAO = await DaosFactory.getDao(PERSISTENCE)

export const userRegister = async (username, password, cb) => {
    try {
        const user = await userDAO.findOne({username})
        if(user){ return cb(null, false, {message: 'User allready exist'})}

        const hash = createHash(password)
        const newUser = await userDAO.create({username, password: hash})

        return cb(null, newUser)
    } catch (error) {
        return cb(error)
    }
}

export const userLogin = async (username, password, cb) => {
    try {
        const user = await userDAO.findOne({username})
        if(!user){ return cb(null, false, { message: 'User does not exist' })}

        if(!isValid(user, password)){ return cb(null, false, { message: 'Wrong password' })}
        
        return cb(null, user)
    } catch (error) {
        return cb(error)
    }
}

export const userDeserialize = async id => {
    return await userDAO.findOne(id)
}