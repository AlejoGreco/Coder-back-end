import { Router } from "express";
import passport from "passport";

const route = Router()

route.post('/register', passport.authenticate('register', 
    {failureMessage: true}), 
    (req, res) => {
        console.log(req.user)
        res.send('User Created!')
    }
)

route.post('/login', passport.authenticate('login', {failureMessage: true}), 
    (req, res) => {
        console.log(req.user)
        res.send(req.session.user)
    }
)

route.post('/logout', (req, res) => {
    req.logout(e => {
        if(e) {
            console.log(e)
            res.send({error: e})
        }
        res.send({status: 'success', message: 'Loged out!'})
    })
})

export default route