var socket = io();

// socket.emit('createMessage', {
//     from: "umbreon55",
//     text: "Hi redKnight93"
// });

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a'); 
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        message: message.text,
        date: formattedTime,
    });
    jQuery('#messages').append(html);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        date: formattedTime,
    });
    jQuery('#messages').append(html);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: `);
    // var a = jQuery('<a target="_blank">My current location</a>');
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
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

var messageTextbox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val() 
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert()
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.')
    })
})