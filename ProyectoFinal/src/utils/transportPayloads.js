export const smsContentGenerator = (twilioNumber, userNumber, content) => (
    {
        from: twilioNumber,
        to: userNumber,
        body: content || 'El pedido ha sido recibido y procesado con exito'
    }
)

export const emailViewGenerator = (from, to, data) => (
    {
        from,
        to,
        subject: `${data.subject}`,
        html: `
            <h3>${data.title}</h3>
            <div>
                ${data.body}
            </div>
            <hr>
            <p>${data.footer}</p>`
    }
)

export const emailCartListGen = products => (
    products.map(item => (`
        <li>
            <p>${item.nombre} - $${item.precio}</p>
            <i>Descripcion: ${item.descripcion}</i>
        </li>`
    )).join(' ')
)

export const emailUserRegGen = user => (
    Object.entries(user).map(item => {
        if(item[0] !== '_id' && item[0] !== '__v' && item[0] !== 'password')
            return `<li>${item[0]}: ${item[1]}</li>`
    }).join(' ')
)