const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Allow all origins (adjust as needed)
        methods: ["GET", "POST"]
    }
});

// Your Socket.io code here...

const PORT = process.env.PORT || 8000; // Use the PORT environment variable or default to 8000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// <----->
const io = require('socket.io')(8000, {cors: {origin: "*"}});

const users = {};

    io.on('connection', socket =>{
        socket.on('new-user-joined', name =>{
            console.log('new user joined', name);
            users[socket.id] = name;
            socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', () =>{
        socket.broadcast.emit('left', users[socket.id]); 
        delete users[socket.id];

    });

});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});