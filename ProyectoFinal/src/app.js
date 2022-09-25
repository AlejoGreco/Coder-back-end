const express = require('express')

const app = express()

const PORT = process.env.PORT || 8080
const server = app.listen(() => { console.log(`Server up! Listening at port ${PORT}`) })

app.use(express.json())
app.use(express.urlencoded())
