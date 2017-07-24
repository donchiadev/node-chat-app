const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    
    it('should generate correct message object', () => {
        var messageParams = {from: 'Admin', text: 'Hi from Admin'}
        var newMessage = generateMessage(messageParams.from, messageParams.text);
        expect(newMessage).toBeA('object');
        expect(newMessage).toInclude(messageParams);
        expect(newMessage.createdAt).toBeA('number');
    });

});

describe('generateLocationMessage', () => {

    it('should generate correct location message', () => {
        var myCoords = {latitude: 1, longitude: 1}
        var expectUrl = `https://www.google.com/maps?q=${myCoords.latitude},${myCoords.longitude}`;
        var newLocationMessage = generateLocationMessage('Admin', myCoords);
        expect(newLocationMessage).toBeA('object');
        expect(newLocationMessage).toInclude({from: 'Admin', url: expectUrl});
        expect(newLocationMessage.createdAt).toBeA('number');
    });

})

