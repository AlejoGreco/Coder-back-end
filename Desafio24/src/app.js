import express  from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import ejs from "ejs"
import authRouter from "./routes/authRoutes.js"
import dashRouter from "./routes/dashRoutes.js"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(session({
    key: "user_sid",
    secret: "elone01",
    resave: false,
    saveUninitialized: false
}))

app.use('/', authRouter)
app.use('/dashboard', dashRouter)

export default app