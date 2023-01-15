import { Router } from "express";

const route = Router()

route.post('/register', (req, res) => {
    console.log({user: req.body})
    res.send('User Created!')
})

route.post('/login', (req, res) => {
    console.log({user: req.body})
    res.send('User loged!')
})

export default route