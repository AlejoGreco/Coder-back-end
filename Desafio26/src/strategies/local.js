import LocalStrategy from 'passport-local'
import passport from 'passport'
import { userModel } from '../model/users.js'

export const registerStrategy = new LocalStrategy(async (username, password, cb) => {
    try {
        const user = await userModel.findOne({username})
        if(user){ return cb(null, false, {message: 'User allready exist'})}

        // Encripatar pass sss

        const newUser = await userModel.create({username, password})
        console.log(newUser)
        return cb(null, newUser)
    } catch (error) {
        return cb(error)
    }
})

export const loginStrategy = new LocalStrategy(async (username, password, cb) => {
    try {
        const user = await userModel.findOne({username})
        if(!user){ return cb(null, false, {message: 'User does not exist'})}

        // Validar password
        if(password !== user.password){ return cb(null, false, {message: 'Wrong password'})}
        
        return cb(null, user)
    } catch (error) {
        return cb(error)
    }
})

passport.serializeUser((user, cb) => {
    cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
    userModel.findById(id, cb)
})