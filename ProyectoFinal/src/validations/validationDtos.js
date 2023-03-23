import yup from 'yup'

class ValidationDtos {
    constructor(){
        this.productSchema = yup.object().shape({
            nombre: yup.string(this.#getValidationMsg('nombre', 'STRING'))
                .min(4, this.#getValidationMsg('nombre', 'MIN', 4))
                .max(24, this.#getValidationMsg('nombre', 'MAX', 24))
                .required(this.#getValidationMsg('nombre', 'REQUIRED')),

            descripcion: yup.string(this.#getValidationMsg('descripcion', 'STRING'))
                .max(48, this.#getValidationMsg('descripcion', 'MAX', 48))
                .required(this.#getValidationMsg('descripcion', 'REQUIRED')),

            url: yup.string(this.#getValidationMsg('url', 'STRING'))
                .url(this.#getValidationMsg('url', 'URL')),

            codigo: yup.number(this.#getValidationMsg('codigo', 'NUM'))
                .positive(this.#getValidationMsg('codigo', 'POS'))
                .integer(this.#getValidationMsg('codigo', 'INT'))
                .required(this.#getValidationMsg('codigo', 'REQUIRED')),

            stock: yup.number(this.#getValidationMsg('stock', 'NUM'))
                .positive(this.#getValidationMsg('stock', 'POS'))
                .integer(this.#getValidationMsg('stock', 'INT'))
                .required(this.#getValidationMsg('stock', 'REQUIRED')),

            precio: yup.number(this.#getValidationMsg('precio', 'NUM'))
                .positive(this.#getValidationMsg('precio', 'POS'))
                .required(this.#getValidationMsg('precio', 'REQUIRED'))
          })

        this.productCartSchema = yup.object().shape({
            id_prod: yup.string(this.#getValidationMsg('id_prod', 'OBJ_ID'))
                .required(this.#getValidationMsg('id_prod', 'REQUIRED')),

            amount: yup.number(this.#getValidationMsg('amount', 'NUM'))
                .positive(this.#getValidationMsg('amount', 'POS'))
                .integer(this.#getValidationMsg('amount', 'INT'))
                .required(this.#getValidationMsg('amount', 'REQUIRED')),
        })

        this.userSchema = yup.object().shape({
            admin: yup.boolean(this.#getValidationMsg('admin', 'BOOL'))
                .default(() => false),
            
            name: yup.string(this.#getValidationMsg('name', 'STRING'))
                .min(4, this.#getValidationMsg('name', 'MIN', 4))
                .max(24, this.#getValidationMsg('name', 'MAX', 24))
                .required(this.#getValidationMsg('name', 'REQUIRED')),

            adress: yup.string(this.#getValidationMsg('adress', 'STRING'))
                .required(this.#getValidationMsg('adress', 'REQUIRED')),

            age: yup.number(this.#getValidationMsg('age', 'NUM'))
                .positive(this.#getValidationMsg('age', 'POS'))
                .integer(this.#getValidationMsg('age', 'INT'))
                .required(this.#getValidationMsg('age', 'REQUIRED')),
            
            phone: yup.string(this.#getValidationMsg('phone', 'STRING'))
                .required(this.#getValidationMsg('phone', 'REQUIRED')),

            avatar: yup.string(this.#getValidationMsg('avatar', 'STRING'))
                .url(this.#getValidationMsg('avatar', 'URL'))
                .default(() => ''),

            email: yup.string(this.#getValidationMsg('email', 'STRING'))
                .email(this.#getValidationMsg('email', 'EMAIL'))
                .required(this.#getValidationMsg('email', 'REQUIRED')),

            password: yup.string(this.#getValidationMsg('password', 'STRING'))
                .min(4, this.#getValidationMsg('password', 'MIN', 4))
                .max(24, this.#getValidationMsg('password', 'MAX', 24))
                .required(this.#getValidationMsg('password', 'REQUIRED'))
        })
    }

    #getValidationMsg(name, type, ...rest){
        const messages = {
            STRING: `El ${name} debe ser una cadena de caracteres`,
            MIN: `El ${name} debe tener al menos ${rest[0]} caracteres de longitud`,
            MAX: `El ${name} no debe tener mas de ${rest[0]} caracteres de longitud`,
            REQUIRED: `El ${name} es un campo requerido`,
            URL: `El ${name} es debe ser una url valida`,
            INT: `El ${name} es debe ser un numero entero`,
            POS: `El ${name} es debe ser un numero positivo`,
            MATCH: `El ${name} no tiene el formato correcto`,
            INT: `El ${name} debe ser un numero`,
            OBJ_ID: `El ${name} debe ser un string formato objId`,
            BOOL: `El ${name} debe ser solo true o false`,
            EMAIL: `El ${name} debe ser un string en formato email`
        }
        return messages[type]
    }

    async validateProductDto(product){
        const result = await this.productSchema.validate(product)
        return result
    }

    async validateCartProductDto(prodData){
        const result = await this.productCartSchema.validate(prodData)
        return result
    }

    async validateUserDto(user){
        const result = await this.userSchema.validate(user)
        return result
    }
}

export default new ValidationDtos()