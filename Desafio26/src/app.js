import express  from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import passport from "passport"
import { registerStrategy } from "./strategies/local.js"
import authRouter from "./routes/authRoutes.js"
import dashRouter from "./routes/dashRoutes.js"
import { MONGO_URL } from "./config/cloud.js"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static('./src/public'))
app.set('views', './src/views')
app.set('view engine', 'ejs')

mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'passport-auth'
    },
    () => console.log('Conectado a Mongo db')
)

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        dbName: 'passport-auth',
        collectionName: 'sessions',
        ttl: 120
    }),
    key: "user_sid",
    secret: "elone01",
    resave: false,
    saveUninitialized: false
}))

passport.use('register', registerStrategy)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRouter) 
app.use('/dashboard', dashRouter)
app.use((req, res) => res.redirect('/login'))

export default app