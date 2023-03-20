import yup from 'yup'

const getValidationMsg = (name, type, ...rest) => {
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
        OBJ_ID: `El ${name} debe ser un string formato objId`
    }
    return messages[type]
}

class ValidationDtos {
    constructor(){
        this.productSchema = yup.object().shape({
            nombre: yup.string(getValidationMsg('nombre', 'STRING'))
                .min(4, getValidationMsg('nombre', 'MIN', 4))
                .max(24, getValidationMsg('nombre', 'MAX', 24))
                .required(getValidationMsg('nombre', 'REQUIRED')),

            descripcion: yup.string(getValidationMsg('descripcion', 'STRING'))
                .max(48, getValidationMsg('descripcion', 'MAX', 48))
                .required(getValidationMsg('descripcion', 'REQUIRED')),

            url: yup.string(getValidationMsg('url', 'STRING'))
                .url(getValidationMsg('url', 'URL')),

            codigo: yup.number(getValidationMsg('codigo', 'NUM'))
                .positive(getValidationMsg('codigo', 'POS'))
                .integer(getValidationMsg('codigo', 'INT'))
                .required(getValidationMsg('codigo', 'REQUIRED')),

            stock: yup.number(getValidationMsg('stock', 'NUM'))
                .positive(getValidationMsg('stock', 'POS'))
                .integer(getValidationMsg('stock', 'INT'))
                .required(getValidationMsg('stock', 'REQUIRED')),

            precio: yup.number(getValidationMsg('precio', 'NUM'))
                .positive(getValidationMsg('precio', 'POS'))
                .required(getValidationMsg('precio', 'REQUIRED'))
          })

        this.productCartSchema = yup.object().shape({
            id_prod: yup.string(getValidationMsg('id_prod', 'OBJ_ID'))
                .required(getValidationMsg('id_prod', 'REQUIRED')),

            amount: yup.number(getValidationMsg('amount', 'NUM'))
                .positive(getValidationMsg('amount', 'POS'))
                .integer(getValidationMsg('amount', 'INT'))
                .required(getValidationMsg('amount', 'REQUIRED')),
        })
    }

    async validateProductDto(product){
        const result = await this.productSchema.validate(product)
        return result
    }

    async validateCartProductDto(prodData){
        const result = await this.productCartSchema.validate(prodData)
        return result
    }
}

export default new ValidationDtos()