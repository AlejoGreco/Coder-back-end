import { Router } from "express"

const route = Router()

route.get('/', (req, res) => {
    console.log(req.session)
    if(req.session.user && req.cookies.user_sid){
        res.send({dash: 'Dashboard'})
    }
    else{
        res.redirect('/login')
    }
})

export default route