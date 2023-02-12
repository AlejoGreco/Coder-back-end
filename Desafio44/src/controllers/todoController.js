import todoService from "./../services/userService.js"

class TodoController {
    constructor(){}

    async getTodo(data){
        return await todoService.getTodo(data.id)
    }

    async getTodos(data){
        console.log(data)
        return await todoService.getTodos(data.done)
    }

    async createTodo(data){
        console.log(data)
        return await todoService.createTodo(data.title)
    } 

    async updateTodo(data){
        return await todoService.updateTodo(data.id)
    }
    
    async deleteTodo(data){
        return await todoService.deleteTodo(data.id)
    }
}

export default new TodoController()