import UserDto from "./UserDto.js"

class CollectDto {
    constructor(user, productList) {
        this.message = 'Orden generada con exito!'
        this.user = new UserDto(user)
        this.cart = productList
        this.collectDate = Date.now()
    }
}

export default CollectDto