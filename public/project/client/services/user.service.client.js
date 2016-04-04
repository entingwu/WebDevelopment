(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .factory("UserService", userService);

    function userService() {
        var CLIENT_ID = '';
        var REDIRECT_URL = '';
        if(location.host == 'localhost:3000') {
            CLIENT_ID = '409f070cb44945d9a85e9b4ad8fa3bf1';
            REDIRECT_URL = 'http://localhost:3000/callback.html';
        }

        var service = {
            getAccessToken : getAccessToken
        };
        return service;

        function getAccessToken() {

        }

    }

})();
