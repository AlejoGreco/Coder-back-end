const express = require('express')
const productosRoute = require('./router/productos')

const app = express()

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up! Listening at port ${PORT}`))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api/productos', productosRoute)

server.on('error', e => console.log(e))
