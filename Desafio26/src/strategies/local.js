import LocalStrategy from 'passport-local'
import { userModel } from '../model/users.js'

export const registerStrategy = new LocalStrategy(async (username, password, cb) => {
    try {
        const user = await userModel.findOne({username})
        if(user){ return cb(null, false, {message: 'User allready exist'})}

        // Encripatar pass

        const newUser = await userModel.create({username, password})
        console.log(newUser)
        return cb(null, newUser)
    } catch (error) {
        return cb(error)
    }
})