import dotenv  from 'dotenv'
dotenv.config()

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/passport-auth'
export const PORT = process.env.PORT || 8080