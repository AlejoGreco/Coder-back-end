import { createHash, isValid } from "../utils/bcrypt.js"
import daos from '../model/index.js'

const { userDAO } = daos

export const userRegister = async (username, password, cb) => {
    try {
        const user = await userDAO.getOneByProp({username})
        if(user){ return cb(null, false, {message: 'User allready exist'})}

        const hash = createHash(password)
        const newUser = await userDAO.createOne({username, password: hash})

        return cb(null, newUser)
    } catch (error) {
        return cb(error)
    }
}

export const userLogin = async (username, password, cb) => {
    try {
        const user = await userDAO.getOneByProp({username})
        if(!user){ return cb(null, false, { message: 'User does not exist' })}

        if(!isValid(user, password)){ return cb(null, false, { message: 'Wrong password' })}
        
        return cb(null, user)
    } catch (error) {
        return cb(error)
    }
}

export const userDeserialize = (id, cb) => {
    userDAO.getOneById(id, cb)
}