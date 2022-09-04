const express = require('express')
const route = express.Router()

let productos = [{id : 1, name: 'alejo'}, {id : 3, name: 'Diego'}]

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
    
})

route.put('/:id', (req, res) => {
    
})

route.delete('/:id', (req, res) => {
    
})

module.exports = route