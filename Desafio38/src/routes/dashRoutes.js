import { Router } from "express"

const route = Router()

route.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.render('dashboard', {
            user: req.user.username
        })
    }
    else{
        res.redirect('/login')
    }
})

export default route