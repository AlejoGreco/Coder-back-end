import express  from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo"
import authRouter from "./routes/authRoutes.js"
import dashRouter from "./routes/dashRoutes.js"
import { advOptions, MONGO_URL } from "./config/cloud.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('./src/public'))
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: advOptions,
        dbName: 'desafio-sessions',
        collectionName: 'sessions',
        ttl: 120
    }),
    key: "user_sid",
    secret: "elone01",
    resave: false,
    saveUninitialized: false
}))

app.use('/', authRouter) 
app.use('/dashboard', dashRouter)
app.use((req, res) => res.redirect('/login'))

export default app