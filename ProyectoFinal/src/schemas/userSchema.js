import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    admin: {type: Boolean, default: false},
    name: {type: String, required: true},
    adress: {type: String, required: true},
    age: {type: Number, required: true},
    phone: {type: String, required: true},
    avatar: {type: String, default: ''},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

export default userSchema