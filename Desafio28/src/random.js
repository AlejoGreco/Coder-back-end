process.on('message', msg => {
    const result = {}
    for(let i = 0; i < msg.amount; i++){
        const num = Math.round(Math.random() * 1000)
        if(result[num]){
            result[num] = result[num] + 1
        }
        else{
            result[num] = 1
        }
    }
    process.send({result})
    process.exit()
})

process.send('ready')