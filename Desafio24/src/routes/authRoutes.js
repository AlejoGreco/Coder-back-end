import { Router } from "express"
import { sessionChecker } from "../middlewares/sessionChecker.js"

const route = Router()

route.use(sessionChecker)

route.get('/', (req, res) => {
    res.redirect('/login')
})

route.get('/login', (req, res) => {
    // responder con formulario de login
    res.render('login')
})

route.get('/logout', (req, res) => {
    res.send({form: 'LOGOUT'})
})

export default route