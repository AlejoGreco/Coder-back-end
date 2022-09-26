const express = require('express')
const route = express.Router()
const ProductManager = require('../controllers/ProductManager')

const pm = new ProductManager('src/data/products.json')

route.get('/', async (req, res) => {
    const products = await pm.getProducts()
    res.send(products)
})

route.get('/:id', async (req, res) => {
    const product = await pm.getProduct(parseInt(req.params.id))
    res.send(product)
})

route.post('/', async (req, res) => {
    const product = await pm.createProduct(req.body)
    res.send(product)
})

route.put('/:id', async (req, res) => {
    const product = await pm.updateProduct(parseInt(req.params.id), req.body)
    res.send(product)
})

route.delete('/:id', (req, res) => {
    res.send(`Delete a productos con id ${req.params.id}`)
})

module.exports = route