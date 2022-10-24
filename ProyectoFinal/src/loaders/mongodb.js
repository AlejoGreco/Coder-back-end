const mongoose = require('mongoose')

async function startMongo() {
    await mongoose.connect('mongodb://localhost/coder')
}

module.exports = startMongo