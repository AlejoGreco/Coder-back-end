import mongoose from "mongoose"

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    done: {type: Boolean, required: true}
})

export default mongoose.model('todo', schema)