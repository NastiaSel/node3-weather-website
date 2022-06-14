

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })




const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

//message1.textContent = 'From js'

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const location = searchElement.value

    message1.textContent = 'Loading'
    message2.textContent = '...'


    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
                // console.log(data.error)
            }
            else {
                message1.textContent = data.location
                message2.textContent = data.forecast.temperature + ' Degrees'
                console.log(data.location)
                console.log(data.forecast.temperature + ' Degrees')
            }
        })
    })
})