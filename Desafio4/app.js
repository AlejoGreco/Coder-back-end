const Contenedor = require('./Contenedor.js')
const prodArray = require('./constantes.js')


const main = async () => {
    const contenedor = new Contenedor('productos.json')

    //const result = await contenedor.save(prodArray[2])
    //const result = await contenedor.getById(2) // Encuentra item
    //const result = await contenedor.getById(10)  // No lo encuentra
    //const result = await contenedor.getAll() 
    //const result = await contenedor.deleteById(2)
    //console.log(result)
    //console.log(await contenedor.getAll())
    contenedor.deleteAll()
}

main()