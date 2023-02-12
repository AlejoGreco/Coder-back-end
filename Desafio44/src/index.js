import app from "./app.js"
import { connectDB } from "./models/todo.js"
import { PORT, MONGO_STR } from "./config.js"

app.listen(PORT, console.log(`Server up at port ${PORT}`))
await connectDB(MONGO_STR)