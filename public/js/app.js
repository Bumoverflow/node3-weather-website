// console.log('Client side javascript file is loaded!')

// fetch('http://localhost:3000/weather?address=Poznan')
//     .then((response)=> {
//         response.json()
//         .then((data) => {
//             if(!data){
//                 console.log('Jakiś error chuj wie co')
//             } else(
//                 console.log(data.forecast),
//                 console.log(data.location)
//             )
//         })
//     })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = `Loading...`
    messageTwo.textContent = ` `
    
    const location = decodeURIComponent(searchElement.value) 
    
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response)=> {
        response.json()
        .then((data) => {
            if(data.error){
                messageOne.textContent = `Nie znaleziono`
                messageTwo.textContent = ``
            } else(
                messageOne.textContent = `${data.forecast}`,
                messageTwo.textContent = `${data.location}`
                // console.log(data.forecast),
                // console.log(data.location)
            )
        })
    })
})