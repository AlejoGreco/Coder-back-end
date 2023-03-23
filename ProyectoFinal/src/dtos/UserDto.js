class UserDto {
    constructor(user){
        this.admin = user.admin,
        this.name = user.name,
        this.adress = user.adress,
        this.age = user.age,
        this.phone = user.phone,
        this.avatar = user.avatar,
        this.email = user.email
    }
}

export default UserDto