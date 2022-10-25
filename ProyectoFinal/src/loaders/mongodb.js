import mongoose from 'mongoose'

async function startMongo() {
    await mongoose.connect('mongodb://localhost/ecommerce')
    console.log('Conctado a mongo db')
}

export default startMongo