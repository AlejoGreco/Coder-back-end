import { Router } from "express";
import passport from "passport";
import transporter, { ADMIN_EMAIL } from "../transports/mailer.js";
import { checkAuth } from "../middlewares/auth.js";

const route = Router()

route.post('/register', passport.authenticate('register', {failureMessage: true}), 
    async (req, res) => {
        try{
            const mailBody = Object.entries(req.user._doc).map(item => {
                if(item[0] !== '_id' && item[0] !== '__v' && item[0] !== 'password')
                    return `<li>${item[0]}: ${item[1]}</li>`
            })
            
            const mailOptions = {
                from: ADMIN_EMAIL,
                to: ADMIN_EMAIL,
                subject: 'Nuevo registro',
                html: `<h3>Usuario registrado</h3>
                    <h4>Datos de usuario</h4>
                    <ul>
                        ${mailBody.join(' ')}
                    </ul>`
            }
            await transporter.sendMail(mailOptions)
            res.send({status: 'success', message: 'User created!'})
        }
        catch (e){
            res.status(501).send({error: e, message: 'No se pudo enviar email de notificacion'})
        }
    }
)

route.post('/login', passport.authenticate('login', {failureMessage: true}), 
    (req, res) => {
        console.log(req.user)
        res.send({status: 'success', message: 'User logged in!'})
    }
)

route.post('/logout', (req, res) => {
    req.logout(e => {
        if(e) {
            console.log(e)
            res.send({error: e})
        }
        console.log(req.user)
        res.send({status: 'success', message: 'User logged out!'})
    })
})

route.get('/info', checkAuth, (req, res) => {
    const user = {
        admin: req.user.admin,
        name: req.user.name,
        adress: req.user.adress,
        age: req.user.age,
        phone: req.user.phone,
        email: req.user.email
    }
    res.send({user})
})

export default route