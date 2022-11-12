import { Router } from "express"
import { sessionChecker } from "../middlewares/sessionChecker.js"

const route = Router()

route.use(sessionChecker)

route.get('/', (req, res) => {
    res.redirect('/login')
})

route.get('/login', (req, res) => {
    res.send({form: 'LOGIN'})
})

route.get('/signup', (req, res) => {
    res.send({form: 'SIGNUP'})
})

route.get('/logout', (req, res) => {
    res.send({form: 'LOGOUT'})
})

export default route