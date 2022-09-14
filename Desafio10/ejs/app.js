const express = require('express')
const productosRoute = require('./routes/productos')

const app = express()
const server = app.listen(8080, () => console.log('Server ejs running!'))

app.use(express.urlencoded())

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/productos', productosRoute)

app.get('/', (req, res) => {
    res.render('home')
})