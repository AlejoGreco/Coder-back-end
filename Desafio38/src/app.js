import express  from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import passport from "passport"
import compression from "compression"
import { registerStrategy, loginStrategy } from "./strategies/local.js"
import authRouter from "./routes/authRoutes.js"
import dashRouter from "./routes/dashRoutes.js"
import processRouter from "./routes/processRoutes.js"
import { loggerWarn } from "./config/loggers.js"
import { logInfo } from "./middlewares/index.js"

const app = express()

app.use(compression({level: 9}))
app.use(express.urlencoded({extended: true}))
app.use(express.query({extended: true}))
app.use(cookieParser())
app.use(express.static('./src/public'))
app.set('views', './src/views')
app.set('view engine', 'ejs')

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
passport.use('login', loginStrategy)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', logInfo, authRouter) 
app.use('/dashboard', dashRouter)
app.use('/api', processRouter)
app.use((req, res) => {
    loggerWarn.warn(`Peticon a ruta no encontrada -> url: ${req.url} | method: ${req.method}`)
    res.redirect('/login')
})

export default app