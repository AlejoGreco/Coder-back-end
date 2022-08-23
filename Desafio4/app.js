const Contenedor = require('./Contenedor.js')
const prodArray = require('./constantes.js')


const main = async () => {
    const contenedor = new Contenedor('productos.json')

    result = await contenedor.save(prodArray[2])
    console.log(result)
}

main()