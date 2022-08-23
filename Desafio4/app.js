const Contenedor = require('./Contenedor.js')
const prodArray = require('./constantes.js')


const main = async () => {
    const contenedor = new Contenedor('productos.json')
    let result

    // Guardando productos en el archivo
    for(const p of prodArray) {
        result = await contenedor.save(p)
        console.log('Nuevo producto Id: ', result.message)
    }

    console.log('\n--------------------------------------------------\n')

    // Encuentra un producto
    result = await contenedor.getById(2)
    console.log('Producto buscado por id: \n', result)
    // Producto no encontrado
    result = await contenedor.getById(20)
    console.log('Producto buscado por id: \n', result)

    console.log('\n--------------------------------------------------\n')

    //Mostrar todos los productos
    result = await contenedor.getAll() 
    console.log('Todos los productos: \n', result)

    console.log('\n--------------------------------------------------\n')

    //Borrar producto
    result = await contenedor.deleteById(2)
    console.log("Id del producto borrado: ", result.message)
    result = await contenedor.getAll() 
    console.log('\nTodos los actualizados productos: \n', result)

    console.log('\n--------------------------------------------------\n')

    // Borrar todo
    console.log('Borrar archivo')
    //contenedor.deleteAll()
    //console.log('FIN')

}

main()