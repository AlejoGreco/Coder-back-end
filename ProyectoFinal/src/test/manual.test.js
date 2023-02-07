import AxiosClient from "../ClientAxios.js"

const config = {
  host: 'localhost', 
  port: 8080
}

const auth = {
  path: 'user/login',
  credentials: {
    "username": "trici1@gmail.com",
    "password": "12345"
  }
}

const client = new AxiosClient(config)

console.log('/------ Test Manual de API ------/')
console.log('/------ ------------------ ------/')
console.log('')

console.log(await client.init(auth.path, auth.credentials))

console.log('')
console.log('/------ Test de Productos ------/')
console.log('')

console.log('GET: debo obtener un array de productos')
let { data } = await client.get('api/productos')
let length = data.length

console.log(`Es array? ${Array.isArray(data)}`)
console.log(data)

console.log('')
console.log('POST: debo obtener el producto creado, con los mismos valores')

const body = {
  nombre: "Producto test 1",
  descripcion: "Soy producto de prueba manual",
  url: "www.test.com/manual.jpeg",
  codigo: 1000,
  stock: 50,
  precio: 77.6
}

let result = await client.post('api/productos', body)
let id = result.data.newItem._id

console.log(`Valor esperado: `)
console.log(body)
console.log('')
console.log(`Valor obtenido: `)
console.log(result.data.newItem)

console.log('')
console.log('GET: debo obtener un array de productos con longitud mas grande')
let result2 = await client.get('api/productos')

console.log(`Longitud previa a la creacion de producto: ${length}`)
console.log(`Longitud posterior a la creacion de producto:  ${result2.data.length}`)

console.log('')
console.log('GET: con id - debo obtener el producto previamente creado')
let result3 = await client.get(`api/productos/${id}`)
console.log('Producto obtenido: ')
console.log(result3.data.item)


console.log('')
console.log('PUT: con id - debo modificar un producto existente')
const newBody = { ...body, descripcion: "Soy producto de prueba manual MODIFICADO", stock: 1 }
console.log(newBody)
let result4 = await client.put(`api/productos/${id}`, newBody)
console.log(`Valor previo:`)
console.log(result3.data.item)
console.log(`Valor obtenido`)
console.log(result4.data)


console.log('')
console.log('Delete: con id - debo eliminar un producto existente')
let result5 = await client.get('api/productos')
length = result5.data.length
await client.delete(`api/productos/${id}`)
result5 = await client.get('api/productos')

console.log(`Longitud previa al borrado de producto: ${length}`)
console.log(`Longitud posterior al borrado de producto:  ${result5.data.length}`)
