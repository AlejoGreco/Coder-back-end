const express = require('express')
const handlebars = require('express-handlebars')
const { route : productosRoute, productos } = require('./routes/productos')

const app = express()
const server = app.listen(8080, () => console.log('Server handlebars running!'))

app.engine('handlebars', handlebars.engine())

app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('/productos', productosRoute)

