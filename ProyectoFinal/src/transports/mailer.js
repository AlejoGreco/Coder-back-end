import { createTransport } from "nodemailer";
import { EMAIL_PASS, ADMIN_EMAIL } from "../config.js";


const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: ADMIN_EMAIL,
        pass: EMAIL_PASS
    }
})

export default transporter