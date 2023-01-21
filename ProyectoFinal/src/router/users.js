import { Router } from "express";
import passport from "passport";
import logger from "../logger/index.js";
import transporter, { ADMIN_EMAIL } from "../transports/mailer.js";
import { emailViewGenerator, emailUserRegGen } from "../utils/transportPayloads.js";
import { checkAuth } from "../middlewares/auth.js";

const route = Router()

route.post('/register', passport.authenticate('register', {failureMessage: true}), 
    async (req, res) => {
        try{           
            const mailContent = {
                subject: `Nuevo registro de usuario`,
                title: `Datos de usuario #${req.user.id}`,
                footer: `Mensaje automatico`,
                body: `<ul>${emailUserRegGen(req.user._doc)}</ul>`
            }
        
            const mailOptions = emailViewGenerator(ADMIN_EMAIL, ADMIN_EMAIL, mailContent)
            await transporter.sendMail(mailOptions)
            res.send({status: 'success', message: 'User created!', userId: req.user.id})
        }
        catch (e){
            res.status(501).send({error: e, message: 'No se pudo enviar email de notificacion'})
        }
    }
)

route.post('/login', passport.authenticate('login', {failureMessage: true}), 
    (req, res) => {
        logger.info(req.user)
        res.send({status: 'success', message: 'User logged in!', userId: req.user.id})
    }
)

route.post('/logout', (req, res) => {
    req.logout(e => {
        if(e) {
            logger.error(e)
            res.send({error: e})
        }
        logger.info(req.user)
        res.send({status: 'success', message: 'User logged out!'})
    })
})

route.get('/info', checkAuth, (req, res) => {
    const {_id, __v, password, ...user} = req.user._doc
    res.send({user})
})

export default route