const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)


require('dotenv').config()
app.use(express.static(path.join(__dirname, 'public')))

// Run when a client connects

io.on('connection', socket => {
    console.log("New WS connection...");
    //Welcome current user
    socket.emit('message', 'Welcome to ChatCord!')

    // Braodcast when a user connects

    socket.broadcast.emit('message', 'A user has joined the chat');

    //Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message',msg)
    })

})


const PORT = 80 || process.env.PORT
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})