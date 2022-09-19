const socket = io.connect()

socket.on('productos', productos => {
    console.log(productos)
})