import express  from "express"
import session from "express-session"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    key: "user_sid",
    secret: "elone01",
    resave: false,
    saveUninitialized: false
}))

export default app