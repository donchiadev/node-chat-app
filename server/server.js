const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

var app = express();
app.use(express.static(publicPath));
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    
    console.log('New User connected.');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
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
