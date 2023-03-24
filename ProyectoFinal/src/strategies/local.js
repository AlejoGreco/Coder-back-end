import passport from 'passport'
import LocalStrategy from 'passport-local'
import daosFactory from '../daos/index.js'
import validationDtos from '../validations/validationDtos.js'
import { createHash, isValid } from '../utils/bcrypt.js'

const userDao = daosFactory.getUserDao()

export const registerStrategy = new LocalStrategy({passReqToCallback: true}, async (req, username, password, cb) => {
    try {
        const userValidateData = await validationDtos.validateUserDto({...req.body, email: username, password})
        
        const user = await userDao.getUser({email: username})
        if(user){ return cb(null, false, { message: 'User allready exist' })}

        const hash = createHash(password)
        const newUser = await userDao.createUser({...userValidateData, password: hash})

        return cb(null, newUser)
    } catch (error) {
        return cb(error)
    }
})

export const loginStrategy = new LocalStrategy(async (username, password, cb) => {
    try {
        const user = await userDao.getUser({email: username})
        if(!user){ return cb(null, false, { message: 'User does not exist' })}

        if(!isValid(user, password)){ return cb(null, false, { message: 'Wrong password' })}
        
        console.log(user)
        return cb(null, user)
    } catch (error) {
        return cb(error)
    }
})

passport.serializeUser((user, cb) => {
    cb(null, {
        id: user._id, 
        admin: user.admin
    })
})

passport.deserializeUser(async (user, cb) => {
    const completeUser = await userDao.getUser({_id: user.id})
    cb(null, completeUser)
})