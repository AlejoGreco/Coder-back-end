const socket = io.connect()
const form = document.getElementById('form')
const formChat = document.getElementById('formChat')

const renderProducts = data => {
    const prodContainer = document.getElementById('productos')
    if(data.length){
        const bodyTable = data.map(p => (
            `<tr>
                <td>${p.title}</th>
                <td>${p.price}</td>
                <td><img src=${p.thumbnail} class="img-thumbnail rounded"></td>
            </tr>`
        )).join(' ')

        prodContainer.innerHTML = `
        <table class="table table-light table-striped table-borderless table-hover">
            <thead>
                <tr>
                    <th scope="col">Titulo</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Imagen</th>
                </tr>
            </thead>
            <tbody>
                ${bodyTable}
            </tbody>
        </table>`
    }
    else{
        prodContainer.innerHTML = '<div class="alert alert-info" role="alert">No hay productos dados de alta</div>'
    }
}

const renderMessages = msgs => {
    const messagesContainer = document.getElementById('messages')
    if(msgs.length){
        const msg = msgs.map(m => (
            `<p>
                <span class="text-primary"><strong>${m.email}</strong> </span>
                <span style="color: brown">[${m.date}]: </span>
                <span class="text-success"><i>${m.msg}</i></span>
            </p>`
        )).join(' ')

        messagesContainer.innerHTML = msg
    }
}

form.addEventListener('submit', e => {
    e.preventDefault()
    let obj = {}
    const formData = new FormData(e.target)
    formData.forEach((value, key) => obj[key]=value)
    socket.emit('newProduct', obj)
})

formChat.addEventListener('submit', e => {
    e.preventDefault()
    let obj = {}
    const feedback = document.getElementById('feedback')
    feedback.innerHTML = ''
    const formData = new FormData(e.target)
    formData.forEach((value, key) => obj[key]=value)
    if(obj.email && obj.email !== ''){
        const date = new Date()
        obj.date = `${date.toLocaleString()}`
        e.target.value = ''
        socket.emit('newMsg', obj)
    }
    else{
        feedback.innerHTML = 'Ingresa un correo valido'
    }
})

socket.on('productos', productos => { renderProducts(productos) })

socket.on('messages', messages => { renderMessages(messages) })