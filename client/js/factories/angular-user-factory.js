app.factory('userFactory', ['$http', function($http) {
    // Setup Factory Object:
    var factory = {};

    // login:
    factory.login = function(user, loginCallback, errorsCallback) {
        console.log('Factory talking...', user);
        $http.post('/login', user)
            .then(function(foundUserAndToken) {
                console.log(foundUserAndToken.data);
                $http.defaults.headers.common.Authorization = "Bearer " + foundUserAndToken.data.myToken
                loginCallback();
            })
            .catch(function(err) {
                console.log(err);
                console.log('Error from DB:', err.data);
                errorsCallback(err.data);
            })
    };

    // register:
    factory.register = function(newUser, registerCallback, errorsCallback) {
        console.log('Factory talking...', newUser);
        $http.post('/register', newUser)
            .then(function(newUserAndToken) {
                console.log(newUserAndToken.data);
                $http.defaults.headers.common.Authorization = "Bearer " + newUserAndToken.data.myToken
                registerCallback();
            })
            .catch(function(err) {
                console.log(err);
                console.log('Error from DB:', err.data);
                errorsCallback(err.data);
            })
    };

    // Show All:
    factory.show = function(showCallback) {
        console.log('Factory talking...showing all users...');
        $http.get('/users')
            .then(function(allUsers) {
                console.log('All users returned...', allUsers.data);
                showCallback(allUsers.data);
            })
            .catch(function(err) {
                console.log('Error showing all useres...', err.data);
            })
    };

    // Find User:
    factory.findOne = function(id, findUserCallback) {
        $http.get('/users/' + id)
            .then(function(userToEdit) {
                console.log(userToEdit.data);
                findUserCallback(userToEdit.data);
            })
            .catch(function(err) {
                console.log(err.data);
            })
    };

    // Update User:
    factory.update = function(id, user, updateCallback, errorsCallback) {
        $http.put('/users/' + id, user)
            .then(function(updatedUser) {
                console.log(updatedUser.data);
                updateCallback();
            })
            .catch(function(err) {
                console.log('ERROR UPDATING!!');
                console.log(err.data);
                errorsCallback(err.data);
            })
    };

    // Delete User:
    factory.delete = function(user, deleteCallback) {
        $http.delete('/users/' + user._id)
            .then(function(message) {
                console.log(message);
                deleteCallback();
            })
            .catch(function(err) {
                console.log('Error deleting user!', err.data);
            })
    }

    // Return Factory Object:
    return factory;
}]);
