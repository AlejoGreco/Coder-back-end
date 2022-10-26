import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    id: {type: ObjectId},
    nombre: {type: String, require: true},
    descripcion: {type: String, require: true},
    url: {type: String},
    codigo: {type: Number, require: true},
    stock: {type: Number, require: true},
    price: {type: Number, require: true}
})

export default ProductSchema