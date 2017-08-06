const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js')

const publicPath = path.join(__dirname, '../public');

var app = express();
app.use(express.static(publicPath));
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
    
    console.log('New User connected.');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }
        
        var usernameTaken = users.users.filter( user => user.name === params.name)[0];
        
        if (usernameTaken) {
            return callback('Username already taken.')
        }
        
        // io.emit() -> io.to(ROOM_NAME).emit()
        // socket.broadcast() -> socket.broadcast.to(ROOM_NAME)
        // socket.emit

        params.room = params.room.toUpperCase();
            
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));
    })

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    })

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords));
        } 
    });

    // socket.emit('newEmail', {
    //     from: 'antonio@gmail.com',
    //     text: "Hi, this is Antonio!",
    //     createdAt: 17072017
    // });

    // socket.on('createEmail', (email) => {
    //     console.log(email);
    // });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
    });


});

server.listen(port, () => {
    console.log(`Server is up on ${port}`)
});
