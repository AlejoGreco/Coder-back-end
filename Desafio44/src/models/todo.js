import mongoose from "mongoose"

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    done: {type: Boolean, required: true}
})

export const connectDB = async(strConnection) => {
    try {
        await mongoose.connect(strConnection)
        console.log('MongoDB connected!')
    } catch(err) {
        console.log(err)
    }
}

export default mongoose.model('todo', schema)