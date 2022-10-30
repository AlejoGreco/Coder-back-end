import mongoose from "mongoose"
import admin from "firebase-admin"
import fs from 'fs'
import { CONNECTION_STR } from '../config.js'
// './src/credentials/firestore-serv-account.json'

class FirestoreContainer {
    constructor(schema, collName){
        this.model = mongoose.model(collName, schema)
        const serviceAccount = JSON.parse(fs.readFileSync(CONNECTION_STR, 'utf8'))
        
        if(admin.apps.length === 0){
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            })
        }
        
        this.coll = admin.firestore().collection(collName)         
        console.log(`Conectado a Firestore`)
    }

    async create(body) {
        const {_id, ...obj} = new this.model(body).toObject()
        return await this.coll.add(obj)
    }
    
    async readAll() {
        const { docs } = await this.coll.get()
        const result = docs.map(doc => (
            {
                _id: doc.id,
                ...doc.data()
            }
        ))
        return result
    }

    async readById(id) {
        const snap = await this.coll.doc(id).get()
        return {_id: snap.id, ...snap.data()}
    }

    async update(id, body) {
        return await this.coll.doc(id).update(body)
    }

    async destroy(id) {
        return await this.coll.doc(id).delete()
    }
}

export default FirestoreContainer