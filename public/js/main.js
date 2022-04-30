const chatForm = document.getElementById('chat-form')


const socket = io();

socket.on('message', message => {
    console.log(message)
    outputMessage(message)
})

//Message submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //GEt msg text
    const msg = e.target.elements.msg.value

    //Emitting a message to the server
    socket.emit('chatMessage', msg)
})

//OUTPUT MESSAGE TO DOM
const outputMessage = (message) => {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`
document.querySelector('.chat-messages').appendChild(div)
}