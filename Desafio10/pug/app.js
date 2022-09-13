const express = require('express')
const productosRoute = require('./routes/productos')

const app = express()
const server = app.listen(8080, () => console.log('Server pugs running!'))

app.use(express.urlencoded())

app.set('views', './views')
app.set('view engine', 'pug')

app.use('/productos', productosRoute)

app.get('/', (req, res) => {
    res.render('form')
})