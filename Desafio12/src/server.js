const express = require('express')
const { Server } = require('socket.io')

const PORT = process.env.PORT || 3000

const app = express()
const server = app.listen(PORT, () => console.log(`Server up! It's running in port ${PORT}`))

const io = new Server(server)   // Creamos servidor tcp para sockets

app.use(express.static('./src/public'))

let productos = []

io.on('connection', socket => {
    console.log(`Nuevo cliente conectado`)
    socket.emit('productos', productos)

})