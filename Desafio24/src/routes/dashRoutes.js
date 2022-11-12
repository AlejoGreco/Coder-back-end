import { Router } from "express"

const route = Router()

route.get('/', (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        res.send({dash: 'Dashboard'})
    }
    res.redirect('/login')
})

export default route