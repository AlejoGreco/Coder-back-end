import usersSchema from '../schemas/users.schema.js'

export default class DaosFactory {
    static getDao = async persistence => {
        switch (persistence) {
            case "ARRAY":
                const { default: UsersDaoArray } = await import('./arrayDao.js')
                return new UsersDaoArray(usersSchema, 'user')
            case "MONGO_DB": 
                const { default: UsersDaoDB } = await import('./mongoDao.js')
                return new UsersDaoDB(usersSchema, 'user')
        }
    }
}