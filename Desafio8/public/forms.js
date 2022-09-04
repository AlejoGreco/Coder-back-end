let productForm = document.getElementById('productForm')

const handleSubmit = (e, route) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    let obj = {}
    formData.forEach((value, key) => obj[key]=value)
    fetch(route, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json())
        .then(response => console.log(response))
}

productForm.addEventListener('submit', (e) => handleSubmit(e, '/api/productos'))
