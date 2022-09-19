const express = require('express')


const PORT = process.env.PORT || 3000

const app = express()
const server = app.listen(PORT, () => console.log(`Server up! It's running in port ${PORT}`))