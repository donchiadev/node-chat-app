var socket = io();

// socket.emit('createMessage', {
//     from: "umbreon55",
//     text: "Hi redKnight93"
// });

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
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

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val() 
    }, function () {

    });
});