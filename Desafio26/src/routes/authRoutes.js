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
    req.session.save(err => err && console.log(err))
    res.redirect('/dashboard')
})

route.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.render('logout', {user: req.session.user.name})
    } else {
        res.redirect('/login')
    }
})

route.delete('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        req.session.destroy()
        //res.clearCookie('user_sid')
    }
    res.redirect('/login')
})

export default route