import TodoDao from "./TodoBasicDao.js"
import MongoContainer from "../containers/MongoContainer.js"
import todoModel from "../models/todo.js"

class TodoMongoDao extends TodoDao {
    constructor(){
        super()
        this.container = new MongoContainer(todoModel)
    }

    async getTodo(id){
        return await this.container.findOne(id)
    }

    async getTodos(query){
        return await this.container.findAll(query)
    }

    async createTodo(newTodo){
        console.log(newTodo)
        return await this.container.create(newTodo)
    }

    async updateTodo(id){
        return await this.container.update(id, {done: true})
    }

    async deleteTodo(id){
        return await this.container.delete(id)
    }
}

export default TodoMongoDao