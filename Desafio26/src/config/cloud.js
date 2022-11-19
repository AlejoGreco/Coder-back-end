import dotenv  from 'dotenv'
dotenv.config()

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/sesiones'
export const PORT = process.env.PORT || 8080

export const advOptions = {useNewUrlParser: true}