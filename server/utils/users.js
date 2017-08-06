// methods to create
// addUsers(id, name, room) -> To add new users
// removeUser(id) -> To remove an user
// getUser(id) -> To retrive an user information
// getUserList(room) -> To retrive a complete list of users that are within a room

class Users {
    
    constructor () {
        this.users = [];
    };
    
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    };
    
    removeUser (id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter( (user) => user.id !== id)
        } 
        return user;
    };

    getUser (id) {
        return this.users.filter( user => user.id === id)[0];
    }

    getUserList (room) {
        var users = this.users.filter( user => user.room === room);
        var namesArray = users.map( user => user.name);
        return namesArray;
    };

};

module.exports = {Users};