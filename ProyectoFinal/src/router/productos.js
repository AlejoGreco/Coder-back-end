const express = require('express')
const route = express.Router()
const ProductManager = require('../controllers/ProductManager')

const pm = new ProductManager('src/data/products.json')

route.get('/', async (req, res) => {
    const products = await pm.getProducts()
    res.send(products)
})

route.get('/:id', async (req, res) => {
    const product = await pm.getProduct(req.params.id)
    res.send(product)
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