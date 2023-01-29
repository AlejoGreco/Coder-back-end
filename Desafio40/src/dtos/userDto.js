export default class UserDto{
    constructor(user){
        this.username = user.username
    }

    getUser(){
        return {user: this.username}
    }
}