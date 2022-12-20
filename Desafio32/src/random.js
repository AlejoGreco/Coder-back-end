export const random = amount => {
    const result = {}
    for(let i = 0; i < amount; i++){
        const num = Math.round(Math.random() * 1000)
        if(result[num]){
            result[num] = result[num] + 1
        }
        else{
            result[num] = 1
        }
    }
    return Promise.resolve(result)
}
