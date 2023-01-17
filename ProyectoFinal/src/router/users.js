import { Router } from "express";
import passport from "passport";

const route = Router()

route.post('/register', passport.authenticate('register', {failureMessage: true}), 
    (req, res) => {
        console.log(req.user)
        res.send({status: 'success', message: 'User created!'})
    }
)

route.post('/login', passport.authenticate('login', {failureMessage: true}), 
    (req, res) => {
        console.log(req.user)
        res.send({status: 'success', message: 'User logged in!'})
    }
)

route.post('/logout', (req, res) => {
    req.logout(e => {
        if(e) {
            console.log(e)
            res.send({error: e})
        }
        console.log(req.user)
        res.send({status: 'success', message: 'User logged out!'})
    })
})

route.get('/info', (req, res) => {
    if(req.isAuthenticated()){
        const user = {
            name: req.user.name,
            adress: req.user.adress,
            age: req.user.age,
            phone: req.user.phone,
            email: req.user.emil
        }
        res.send({resulusert})
    }
    else{
        res.status(401).send({message: 'User unknow. You must be logged for this request'})
    }
})

export default route