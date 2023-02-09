import supertest from "supertest"
import { expect } from "chai"
import { config, auth } from './config.test.js'

const request = supertest(`http://${config.host}:${config.port}`)

describe('Test API - Entidad Productos', function() {
    let cookies
    this.timeout(5000)
    
    before(async () => {
        // Logueo de usuario y guardado de cookie de session
        const res = await request.post(`/${auth.path}`).send(auth.credentials)
        cookies = res.headers['set-cookie'].toString().split(';')[0].concat(';')
    })

    after(async () => {
        await request.delete(`/${auth.path}`).set('Cookie', [cookies])
        console.log('Logged out')
    })

    describe('POST', () => {

        it('Se deberia agregar un producto', async () => {
            const body = {
                nombre: "Producto test 1",
                descripcion: "Soy producto de prueba manual",
                url: "www.test.com/manual.jpeg",
                codigo: 1000,
                stock: 50,
                precio: 77.6
            }

            const res = await request.post('/api/productos').set('Cookie', [cookies]).send(body)
            expect(res.status).to.equal(200)

            const {_id, __v, ...newBody} = res.body.newItem
            // verifico keys del schema
            expect(res.body.newItem).to.include.keys('nombre', 'descripcion', 'url', 'codigo', 'stock', 'precio', '_id')
            // verifico values
            expect(newBody).to.deep.equal(body)
            
        })

    })

    describe('GET', () => {

        it('Debería retornar un array de producto o array vacio', async () => {
            const res = await request.get('/api/productos').set('Cookie', [cookies])
            expect(res.status).to.equal(200)
            expect(Array.isArray(res.body)).to.equal(true)
        })

        it('Debería retornar el producto indicado al especificar id', async () => {
            let res = await request.get('/api/productos').set('Cookie', [cookies])
            expect(res.status).to.equal(200)
            
            const id = res.body[0]._id
            const { body } = await request.get(`/api/productos/${id}`).set('Cookie', [cookies])
            // verifico schema de producto
            expect(body.item).to.include.keys('nombre', 'descripcion', 'url', 'codigo', 'stock', 'precio', '_id')
            // verifico mismo id que solicite
            expect(body.item._id).to.equal(id)
        })
    })

    describe('PUT', () => {
        it('Debo actualizar un producto existente', async () => {
            let res = await request.get('/api/productos').set('Cookie', [cookies])
            expect(res.status).to.equal(200)
            const {_id, __v, ...oldBody} = res.body[0]

            const newBody = { 
                ...oldBody,
                nombre: "Producto test 1 MODIFICADO",
                descripcion: "Soy producto de prueba manual MODIFICADO",
                stock: 1 
            }

            await request.put(`/api/productos/${_id}`).set('Cookie', [cookies]).send(newBody)
            const { body } = await request.get(`/api/productos/${_id}`).set('Cookie', [cookies])
            expect({_id, __v, ...newBody}).to.deep.equal(body.item)
        })
    })

    describe('Peticiones DELETE', () => {
        it('Debe quitar el producto especificado del arreglo de productos', async () => {
            let res = await request.get('/api/productos').set('Cookie', [cookies])
            const originalLength = res.body.length
            expect(res.status).to.equal(200)
            

            const id = res.body[0]._id
            await request.delete(`/api/productos/${id}`).set('Cookie', [cookies])
            res = await request.get('/api/productos').set('Cookie', [cookies])
            
            // verifico que se achico el arreglo de productos
            expect(res.body.length).to.equal(originalLength - 1)

            res = await request.get(`/api/productos/${id}`).set('Cookie', [cookies])
            expect(res.body.item).to.equal(null)
        })
    })
})