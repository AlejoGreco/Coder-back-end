import { Router } from "express";

const route = Router()

route.post('/register', (req, res) => {
    req.session.user = req.body
    res.send('User Created!')
})

route.post('/login', (req, res) => {
    //console.log({user: req.body})
    res.send(req.session.user)
})

route.get('/logout', (req, res) => {
    if(req.session.user){
        req.session.destroy(e => {
            res.send('User Logged out!')
        })
    }
})

export default route