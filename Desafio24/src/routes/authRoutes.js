import { Router } from "express"
import { sessionChecker } from "../middlewares/sessionChecker.js"

const route = Router()

route.get('/', sessionChecker, (req, res) => {
    res.redirect('/login')
})

route.get('/login', sessionChecker, (req, res) => {
    res.render('login')
})

route.post('/login', (req, res) => {
    req.session.user = req.body
    res.redirect('/dashboard')
})

route.get('/logout', sessionChecker, (req, res) => {
    res.send({form: 'LOGOUT'})
})

export default route