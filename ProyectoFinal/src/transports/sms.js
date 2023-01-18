import twilio from "twilio";
import { TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID } from "../config.js";

export const twilioNumber = '+16293565439'
export const adminNumber = '+542216221175'

export default twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)