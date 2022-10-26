import dotenv  from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3000
export const PERSISTENCE = process.env.PERSISTENCE || 'MONGO_DB'
export const URI_DATABASE = process.env.URI_DATABASE || '127.0.0.1'
