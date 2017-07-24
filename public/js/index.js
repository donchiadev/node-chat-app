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

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    li.text(`${message.from}: `);
    var a = jQuery('<a target="_blank">My current location</a>');
    a.attr('href', message.url);
    li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alter()
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.')
    })
})