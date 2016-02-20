/**
 * Factory pattern
 */
(function()
{
    angular
        .module("UserApp")
        .factory("UserService", userService);

    function userService()
    {   //static variable
        var users = [
            {username: "Alex"},
            {username: "Bob"},
            {username: "Charlie"},
        ];
        /* API */
        var service = {
            findAllUsers : findAllUsers,
            findUserById : findUserById
        };

        return service;

        function findAllUsers()
        {
            console.log("return all users!");
            return users;
        }

        function findUserById(id)
        {
            return users[id];
        }

    }
})();