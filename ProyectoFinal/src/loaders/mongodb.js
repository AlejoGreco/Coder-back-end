const mongoose = require('mongoose')

async function startMongo() {
    await mongoose.connect('mongodb://localhost/ecommerce')
    console.log('Conctado a mongo db')
}

module.exports = startMongo