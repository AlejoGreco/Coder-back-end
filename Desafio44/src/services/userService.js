import TodoMongoDao from "../daos/TodoMongoDao.js"

class TodoService {
    constructor(){
        this.dao = new TodoMongoDao()
    }

    async getTodo(id){
        const todo = await this.dao.getTodo(id)
        return todo
    }

    async getTodos(done){
        let query = {}
        if(done !== null && done !== undefined)
            query = { done }
        const todo = await this.dao.getTodos(query)
        return todo
    }

    async createTodo(title){
        const newTodo = {
            title,
            date: new Date().toLocaleString(),
            done: false
        }

        return await this.dao.createTodo(newTodo)
    }

    async updateTodo(id){
        const todo = await this.dao.updateTodo(id)
        return todo
    }

    async deleteTodo(id){
        const todo = await this.dao.deleteTodo(id)
        return todo
    }
}

export default new TodoService()