import { Router } from "express"

const route = Router()

route.get('/', (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        res.render('dashboard', {
            user: req.session.user.name, 
            email: req.session.user.name
        })
    }
    else{
        res.redirect('/login')
    }
})

export default route