import { Router } from "express"
import passport from "passport"
import { 
    deleteAuthLogoutController,
    getAuthController, 
    getAuthFailController, 
    getAuthLoginController, 
    getAuthLogoutControler, 
    getAuthRegisterController, 
    postAuthLoginController, 
    postAuthRegisterController 
} from "../controllers/auth.controller.js"

const route = Router()

route.get('/', getAuthController)
route.get('/register', getAuthRegisterController)
route.get('/login', getAuthLoginController)
route.get('/logout', getAuthLogoutControler)
route.delete('/logout', deleteAuthLogoutController)
route.get('/fail-auth', getAuthFailController)

route.post('/register', passport.authenticate('register', {
        failureRedirect: '/fail-auth', failureMessage: true
    }),
        postAuthRegisterController
)
route.post('/login', passport.authenticate('login', {
        failureRedirect: '/fail-auth', failureMessage: true
    }),
        postAuthLoginController
)

export default route