const expect = require('expect');

const {Users} = require('./users');

var users = {};

beforeEach( () => {
    users = new Users();
    users.users = [
        {
            'id': 1,
            'name': 'Jason',
            'room': 'NodeJS Course'
        },
        {
            'id': 2,
            'name': 'Tommy',
            'room': 'React Course'
        },
        {
            'id': 3,
            'name': 'Adam',
            'room': 'NodeJS Course'
        }
    ];
});

describe('Users', () => {

    it('should add new user', () => {
        var users = new Users();
        var user = {
            'id': 123,
            'name': 'Antonio',
            'room': 'NodeJS Course'
        }
        users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for node course', () => {
        expect(users.getUserList('NodeJS Course')).toEqual(['Jason', 'Adam']);
    });

    it('should return names for react course', () => {
        expect(users.getUserList('React Course')).toEqual(['Tommy']);
    });

    it('should find a user', () => {
        var id = 1;
        var user = users.getUser(id);
        expect(user.id).toBe(id);
    });

    it('should not find a user', () => {
        var id = 99;
        var user = users.getUser(id);
        expect(user).toNotExist();
    });

    it('should remove a user', () => {
        var id = 2;
        var user = users.removeUser(id);
        expect(users.users.length).toBe(2);
        expect(user.id).toBe(id);
    });

    it('should not remove a user', () => {
        var id = 4;
        users.removeUser(id);
        expect(users.users.length).toBe(3);
    });

});



  