var socket = io();

// socket.emit('createMessage', {
//     from: "umbreon55",
//     text: "Hi redKnight93"
// });

socket.on('newMessage', function (message) {
    console.log(message);
});

// socket.emit('createEmail', {
//     to: 'andrea@gmail.com',
//     text: 'Hi Andrea!'
// });

// socket.on('newEmail', function (email) {
//     console.log(email);
// })

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});