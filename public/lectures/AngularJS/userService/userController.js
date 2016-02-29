/**
 * Created by entingwu on 2/18/16.
 */
(function()
{
    angular
        .module("UserApp")
        .controller("userController", UserController);

    function UserController($scope, UserService)
    {
        $scope.users = UserService.findAllUsers();
        console.log("users controller getting users!");

        //use UserService to retrieve var
    }
})();