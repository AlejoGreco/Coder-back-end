import { createTransport } from "nodemailer";
import { EMAIL_PASS } from "../config.js";

export const ADMIN_EMAIL = 'uki.greco@gmail.com'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: ADMIN_EMAIL,
        pass: EMAIL_PASS
    }
})

export default transporter