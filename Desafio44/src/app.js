import express from "express"
import { graphqlHTTP } from "express-graphql"
import todoController from "./controllers/todoController.js"
import schema from "./schemaQL/schema.js"

const app = express()

const root = {
    getTodo: param => todoController.getTodo(param),
    getTodos: param => todoController.getTodos(param),
    createTodo: param => todoController.createTodo(param),
    updateTodo: params => todoController.updateTodo(params),
    deleteTodo: param => todoController.deleteTodo(param)
}

app.use(express.json())

app.use('/test', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

export default app
