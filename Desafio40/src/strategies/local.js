import LocalStrategy from 'passport-local'
import passport from 'passport'
import { userDeserialize, userLogin, userRegister } from '../services/user.services.js'

export const registerStrategy = new LocalStrategy(async (username, password, cb) => {
    return await userRegister(username, password, cb)
})

export const loginStrategy = new LocalStrategy(async (username, password, cb) => {
    return await userLogin(username, password, cb)
})

passport.serializeUser((user, cb) => {
    cb(null, user._id)
})

passport.deserializeUser(async (id, cb) => {
    const user = await userDeserialize(id)
    cb(null, user)
})