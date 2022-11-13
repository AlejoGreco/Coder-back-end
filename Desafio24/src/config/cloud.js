import dotenv  from 'dotenv'
dotenv.config()

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/sesiones'
export const advOptions = {useNewUrlParser: true}