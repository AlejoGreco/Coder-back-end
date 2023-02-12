import TodoDao from "../daos/TodoBasicDao"

class TodoService {
    constructor(){
        this.dao = new TodoDao()
    }

    async getTodo(id){
        const todo = await this.dao.getTodo(id)
        return todo
    }

    async getTodos(done){
        let query = null
        if(done !== null && done !== undefined)
            query = { done }
        const todo = await this.dao.getTodos(done)
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