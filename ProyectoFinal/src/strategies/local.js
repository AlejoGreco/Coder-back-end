import mongoose from 'mongoose'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import UserSchema from '../schemas/userSchema.js'
import { createHash, isValid } from '../utils/bcrypt.js'

const userModel = new mongoose.model('user', UserSchema)

export const registerStrategy = new LocalStrategy({passReqToCallback: true}, async (req, username, password, cb) => {
    try {
        const user = await userModel.findOne({username})
        if(user){ return cb(null, false, { message: 'User allready exist' })}

        const hash = createHash(password)
        const newUser = await userModel.create({...req.body, password: hash})

        return cb(null, newUser)
    } catch (error) {
        return cb(error)
    }
})

export const loginStrategy = new LocalStrategy(async (username, password, cb) => {
    try {
        const user = await userModel.findOne({username})
        if(!user){ return cb(null, false, { message: 'User does not exist' })}

        if(!isValid(user, password)){ return cb(null, false, { message: 'Wrong password' })}
        
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