const Contenedor = require('./Contenedor.js')
const prodArray = require('./constantes.js')


const main = async () => {
    const contenedor = new Contenedor('productos.json')

    //const result = await contenedor.save(prodArray[2])
    //const result = await contenedor.getById(2) // Encuentra item
    //const result = await contenedor.getById(10)  // No lo encuentra
    console.log(result)
}

main()