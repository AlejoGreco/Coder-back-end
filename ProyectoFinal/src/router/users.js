import { Router } from "express";
import passport from "passport";
import { checkAuth } from "../middlewares/auth.js";
import userController from "../controllers/userController.js";

const route = Router()

route.post('/register', passport.authenticate('register', {failureMessage: true}), userController.registerUser)
route.post('/login', passport.authenticate('login', {failureMessage: true}), userController.loginUser) 
route.post('/logout', userController.logoutUser)
route.get('/info', checkAuth, userController.infoUser)

export default route