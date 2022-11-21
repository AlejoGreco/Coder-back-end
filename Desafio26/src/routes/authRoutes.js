import { Router } from "express"
import passport from "passport"
const route = Router()

route.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/login')
    }
    else{
        res.redirect('/dashboard')
    }
})

route.get('/register', (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('authForm', {
            title: 'Register',
            action: '/register',
            href: '/login',
            linkMsg: 'Go to log in!'
        })
    }
    else {
        res.redirect('/dasboard')
    }
})

route.post('/register', passport.authenticate('register', {
        failureRedirect: '/fail-auth', failureMessage: true
    }),
    (req, res) => {
        req.logOut(err => {
            if(err){ return res.redirect('/fail-auth') }
            res.redirect('/login')
        })
    }
)

route.get('/login', (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('authForm', {
            title: 'Login',
            action: 'login',
            href: '/register',
            linkMsg: 'Go to sign up!'
        })
    }
    else {
        res.redirect('/dashboard')
    }
})

route.post('/login', passport.authenticate('login', {
    failureRedirect: '/fail-auth', failureMessage: true
    }),
    (req, res) => {
        res.redirect('/dashboard')
    }
)

route.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('logout', {user: req.user.username})
    } else {
        res.redirect('/login')
    }
})

route.delete('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout(err => {
            if(err) { return res.redirect('/fail-auth') }
            return res.redirect('/login')
        })
    }
    else{
        return res.redirect('/login')
    }
})

route.get('/fail-auth', (req, res) => {
    const feedback = req.session.messages
    if(feedback){
        req.session.messages = ''
        res.render('auth-error', { feedback })
    }    
    else{
        res.redirect('/')
    }
})

export default route