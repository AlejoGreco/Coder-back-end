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

/*console.log('')
console.log('POST: debo obtener el producto creado, con los mismos valores')
const body= {}
result = await client.post('/api/productos', body)
let id = result._id

console.log(`Valor esperado ${body}`)
console.log(`Valor obtenido ${result}`)

console.log('')
console.log('GET: debo obtener un array de productos con longitud mas grande')
result = await client.get('/api/productos')

console.log(`Longitud previa a la creacion de producto: ${length}`)
console.log(`Longitud posterior a la creacion de producto:  ${result.length}`)

console.log('')
console.log('GET: con id - debo obtener un producto')
result = await client.get('/api/productos', id)

console.log('')
console.log('PUT: con id - debo modificar un producto existente')
const newBody = {}
result = await client.put('/api/productos', id, newBody)
console.log(`Valor esperado ${newBody}`)
console.log(`Valor obtenido ${result}`)

console.log('')
console.log('Delete: con id - debo eliminar un producto existente')
result = await client.get('/api/productos')
length = result.length
await client.delete('/api/productos', id)
result = await client.get('/api/productos')

console.log(`Longitud previa al borrado de producto: ${length}`)
console.log(`Longitud posterior al borrado de producto:  ${result.length}`)

*/
