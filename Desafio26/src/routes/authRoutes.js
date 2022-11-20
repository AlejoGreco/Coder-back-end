import { Router } from "express"
import passport from "passport"
const route = Router()

route.get('/', (req, res) => {
    res.redirect('/login')
})

route.get('/register', (req, res) => {
    res.render('register')
})

route.post('/register', passport.authenticate('register', {
        failureRedirect: '/fail-register', failureMessage: 'Error en el registro'
    }),
    (req, res) => {
        res.redirect('/login')
    }
)

route.get('/login', (req, res) => {
    res.render('login')
})

route.post('/login', (req, res) => {
    /*req.session.user = req.body
    req.session.save(err => err && console.log(err))
    res.redirect('/dashboard')*/
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
    }
    res.redirect('/login')
})

route.get('/fail-register', (req, res) => res.send(req))

export default route