import mongoose from "mongoose"

export default new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})