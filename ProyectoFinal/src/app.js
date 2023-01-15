import express from 'express'
import productosRoute from './router/productos.js'
import carritosRoute from './router/carritos.js'
import userRoute from './router/users.js'
import { PORT } from './config.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api/productos', productosRoute)
app.use('/api/carrito', carritosRoute)
app.use('/user', userRoute)

app.use((req, res) => {
    res.status(404).send({
        error: -2, 
        descripcion: `Ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`
    })
})

const server = app.listen(PORT, () => console.log(`Server up! Listening at port ${PORT}`))
server.on('error', e => console.log(e))
