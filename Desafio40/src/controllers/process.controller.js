import { performHeavyProcess, getProcessData } from "../services/process.services.js"

export const getRandomDataController = async (req, res) => {
    const amount = req.query.amount ? parseInt(req.query.amount) : 100000000
    const result = await performHeavyProcess(amount)

    res.render('random', {
        result,
        length: 1000
    })
}

export const getProcessDataController = (req, res) => {    
    const processData = getProcessData()

    res.render('info', {
        ...processData
    })
}