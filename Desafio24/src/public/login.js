const URL_FETCH = 'http://localhost:8080/login'
const formlogin = document.getElementById('formLogin')

formlogin.addEventListener('submit', e => {
    e.preventDefault()
    let obj = {}
    const feedback = document.getElementById('feedback')
    feedback.innerHTML = ''

    const formData = new FormData(e.target)
    formData.forEach((value, key) => obj[key]=value)
    console.log(obj)
    
    fetch(URL_FETCH, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {'Content-Type': 'application/json'}
    })
    .then(() => e.target.value = '')
    .catch(e => {
        feedback.innerHTML = `Code ${e} | Error ${e.message}`
        feedback.parentElement.classList.replace('d-none', 'd-block')
    })
})