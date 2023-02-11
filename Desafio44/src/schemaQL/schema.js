import { buildSchema } from "graphql"

export default buildSchema(`
    type Todo {
        id: ID!
        title: String,
        date: TimeStamp,
        done: Boolean
    }

    type Query {
        getTodo(id: ID!): Todo,
        getTodos(done: Boolean): [Todo]
    }

    type Mutation {
        createTodo(title: String): Todo,
        updateTodo(id: ID!): Todo,
        deleteTodo(id: ID!): Todo
    }
`)