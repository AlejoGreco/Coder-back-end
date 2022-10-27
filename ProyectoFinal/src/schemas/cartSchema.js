import mongoose from 'mongoose'
import ProductSchema from './productSchema.js'

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    timestamp: {type: Number, required: true},
    products: [ProductSchema]
    
})

export default CartSchema