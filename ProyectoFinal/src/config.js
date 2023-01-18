import dotenv  from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3000
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const EMAIL_PASS = process.env.EMAIL_PASS || ''
export const PERSISTENCE = process.env.PERSISTENCE || 'MONGO_DB'
export const CONNECTION_STR = process.env.CONNECTION_STR || '127.0.0.1'
export const FS_FILES_DEST_PATH = process.env.FS_FILES_DEST_PATH || 'src/data/'
