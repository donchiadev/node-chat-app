const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    
    it('should generate correct message object', () => {
        var messageParams = {from: 'Admin', text: 'Hi from Admin'}
        var newMessage = generateMessage(messageParams.from, messageParams.text);
        expect(newMessage).toBeA('object');
        expect(newMessage).toInclude(messageParams);
        expect(newMessage.createdAt).toBeA('number');
    });

});

