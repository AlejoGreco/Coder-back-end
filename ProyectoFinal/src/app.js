import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import productosRoute from './router/productos.js'
import carritosRoute from './router/carritos.js'
import userRoute from './router/users.js'
import { CONNECTION_STR, PORT } from './config.js'
import { checkAuth } from './middlewares/auth.js'
import { loginStrategy, registerStrategy } from './strategies/local.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

// Sessions config
mongoose.connect(CONNECTION_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'ecommerce-users'
    },
    () => console.log('Conectado a Mongo db')
)

app.use(session({
    store: new MongoStore({
        client: mongoose.connection.getClient(),
        dbName: 'ecommerce-users',
        collectionName: 'sessions',
        ttl: 300
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

// Routes
app.use('/api/productos', checkAuth, productosRoute)
app.use('/api/carrito', checkAuth, carritosRoute)
app.use('/user', userRoute)

app.use((req, res) => {
    res.status(404).send({
        error: -2, 
        descripcion: `Ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`
    })
})

// Server up
const server = app.listen(PORT, () => console.log(`Server up! Listening at port ${PORT}`))
server.on('error', e => console.log(e))