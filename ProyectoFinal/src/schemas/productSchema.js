import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    url: {type: String},
    codigo: {type: Number, required: true},
    stock: {type: Number, required: true},
    precio: {type: Number, required: true}
})

export default ProductSchema