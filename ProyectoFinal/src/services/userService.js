import transporter from "../transports/mailer.js";
import { ADMIN_EMAIL } from "../config.js";
import { emailViewGenerator, emailUserRegGen } from "../utils/transportPayloads.js";
import ErrorDto from "../dtos/ErrorDto.js";


class userService {
    constructor(){}

    async registerUser(user){
        try{
            const mailContent = {
                subject: `Nuevo registro de usuario`,
                title: `Datos de usuario #${user.id}`,
                footer: `Mensaje automatico`,
                body: `<ul>${emailUserRegGen(user._doc)}</ul>`
            }
        
            const mailOptions = emailViewGenerator(ADMIN_EMAIL, ADMIN_EMAIL, mailContent)
            await transporter.sendMail(mailOptions)
        }
        catch (e){
            throw new ErrorDto({params: {}, app: e}, 'No se pudo generar correo automatico | Lanzado por aplicacion', 400, -500)
        }
    }
}

export default new userService()