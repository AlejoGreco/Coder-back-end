const express = require('express')
const productosRoute = require('./router/productos')
const carritosRoute = require('./router/carritos')

const app = express()

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up! Listening at port ${PORT}`))

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

server.on('error', e => console.log(e))
