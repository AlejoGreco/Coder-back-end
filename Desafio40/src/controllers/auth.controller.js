import UserDto from "../dtos/userDto.js"
import AuthDto from "../dtos/authDto.js"

export const getAuthController = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/login')
    }
    else{
        res.redirect('/dashboard')
    }
}

export const getAuthRegisterController = (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('authForm', new AuthDto('Register'))
    }
    else {
        res.redirect('/dasboard')
    }
}

export const postAuthRegisterController = (req, res) => {
    req.logOut(err => {
        if(err){ return res.redirect('/fail-auth') }
        res.redirect('/login')
    })
}

export const getAuthLoginController = (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('authForm', new AuthDto('Login'))
    }
    else {
        res.redirect('/dashboard')
    }
}

export const postAuthLoginController = (req, res) => {
    res.redirect('/dashboard')
}

export const getAuthLogoutControler = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('logout', new UserDto(req.user).getUser())
    } else {
        res.redirect('/login')
    }
}

export const deleteAuthLogoutController = (req, res) => {
    if (req.isAuthenticated()) {
        req.logout(err => {
            if(err) { return res.redirect('/fail-auth') }
            return res.redirect('/login')
        })
    }
    else{
        return res.redirect('/login')
    }
}

export const getAuthFailController = (req, res) => {
    const feedback = req.session.messages
    if(feedback){
        req.session.messages = ''
        res.render('auth-error', { feedback })
    }    
    else{
        res.redirect('/')
    }
}