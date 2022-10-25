import express from 'express'
import productosRoute from './router/productos.js'
import carritosRoute from './router/carritos.js'
import Loaders from './loaders/index.js'

Loaders.start('MONGO_DB')
const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api/productos', productosRoute)
app.use('/api/carrito', carritosRoute)

app.use((req, res) => {
    res.status(404).send({
        error: -2, 
        descripcion: `Ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`
    })
})

const server = app.listen(PORT, () => console.log(`Server up! Listening at port ${PORT}`))
server.on('error', e => console.log(e))
