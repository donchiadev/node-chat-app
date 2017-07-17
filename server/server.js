const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
app.use(express.static(publicPath));
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    
    console.log('New User connected.');
    
    socket.emit('newMessage', {
        from: 'redKnight93',
        text: 'Hi everyone!',
        createdAt: 17072017
    });

    socket.on('createMessage', (message) => {
        console.log(message);
    })

    // socket.emit('newEmail', {
    //     from: 'antonio@gmail.com',
    //     text: "Hi, this is Antonio!",
    //     createdAt: 17072017
    // });

    // socket.on('createEmail', (email) => {
    //     console.log(email);
    // });

    socket.on('disconnect', () => {
        console.log('Users was disconnected.');
    });


});

server.listen(port, () => {
    console.log(`Server is up on ${port}`)
});
