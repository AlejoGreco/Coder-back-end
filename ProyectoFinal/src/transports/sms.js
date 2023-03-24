import twilio from "twilio";
import { TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID } from "../config.js";

export default twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)