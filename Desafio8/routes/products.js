const express = require('express')
const route = express.Router()

let productos = []

route.get('/', (req, res) => {
    res.send({productos})
})

route.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)
    if(producto)
        res.send({foundProduct : producto})
    else
        res.send({error: `Producto de id ${id} no encontrado`})
})

route.post('/', (req, res) => {
    const pData = req.body
    let producto = {}

    if(productos.length)
        producto = {id : (productos[productos.length - 1].id + 1), ...pData}
    else
        producto = {id : 1, ...pData}

    productos.push(producto)
    res.send({nuevoProducto : producto, message : 'Producto creado'})
})

route.put('/:id', (req, res) => {
    
})

route.delete('/:id', (req, res) => {
    
})

module.exports = route