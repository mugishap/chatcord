const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomname = document.getElementById('room-name')
const userList = document.getElementById('users')

//Get username ans roo from URL
const { username, room } = Qs.parse(location.search, {})

ignoreQueryPrefix: true

const socket = io();

//JOIN CHAT ROOM
socket.emit('joinRooom', { username, room })

//Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room)
    outputUsers(users)
})

//Message from server
socket.on('message', message => {
    // console.log(message)
    outputMessage(message)

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Message submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //GEt msg text
    const msg = e.target.elements.msg.value

    //Emitting a message to the server
    socket.emit('chatMessage', msg)

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus
})

//OUTPUT MESSAGE TO DOM
const outputMessage = (message) => {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}
//Add room NAME to DOM
const outputRoomName = (room) => {
    roomname.innerText = room;
}
const outputUsers = users => {
    userList.innerHTML = `
    ${users.map(user =>
        `<li>user.username</li>`
    ).join("")}
    `
}