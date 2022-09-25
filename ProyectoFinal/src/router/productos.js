const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.send({msg: 'Get a productos'})
})

route.get('/:id', (req, res) => {
    res.send(`Get a productos con id ${req.params.id}`)
})

route.post('/', (req, res) => {
    res.send(`Post a productos`)
})

route.put('/:id', (req, res) => {
    res.send(`Put a productos con id ${req.params.id}`)
})

route.delete('/:id', (req, res) => {
    res.send(`Delete a productos con id ${req.params.id}`)
})

module.exports = route