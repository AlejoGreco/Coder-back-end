import mongoose from "mongoose"
import admin from "firebase-admin"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
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

    async create(req, res) {
        try {
            const item = { timestamp: Date.now(), ...req.body }
            const { _id, ...obj } = new this.model(item).toObject()
            await this.coll.add(obj)
            return res.status(200).json({ message: 'Item created!' })
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }
    
    async readAll(req, res) {
        try {
            const { docs } = await this.coll.get()
            const items = docs.map(doc => ({
                _id: doc.id,
                ...doc.data()
            }))
            return res.status(200).json(items)      
        } 
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async readById(req, res) {
        try {
            const snap = await this.coll.doc(req.params.id).get()
            const item = { _id: snap.id, ...snap.data() }
            return res.status(200).json(item)
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }     
    }

    async update(req, res) {
        try {
            await this.coll.doc(req.params.id).update(req.body)
            return res.status(200).json({ message: 'Item updated!'})
        } 
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

    async destroy(req, res) {
        try {
            await this.coll.doc(req.params.id).delete()
            return res.status(200).json({ message: 'Item deleted!'})
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }        
    }

    async readSubitems(req, res, prop) {
        try {
            const snap = await this.coll.doc(req.params.id).get()
            return res.status(200).json(snap.data()[prop])
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }  
    }

    async addSubItem(req, res, prop) {
        try{
            const item = { timestamp: Date.now(), ...req.body }
            const parent = new this.model({timestamp: Date.now()})
            parent[prop].push(item)
            const { _id, ...child } = parent[prop][0].toObject()
            
            
            return res.status(200).json({ message: 'Item added!', result})
        }
        catch (e){
            return res.status(404).json({ message: e.message, code: e.code })
        }
    }

}

export default FirestoreContainer