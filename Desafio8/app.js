const express = require('express')
const productsRoute = require('./routes/products')

const app = express()

const server = app.listen(8080, () => console.log('Server up!'))

server.on('error', e => console.log(e))

app.use(express.json())
app.use('/api/productos', productsRoute)