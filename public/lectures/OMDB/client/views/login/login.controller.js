(function(){
    angular
        .module("OmdbApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;//LoginController instance

        vm.login = login;

        function init() {}
        init();

        //event handler : takes the user from the view
        function login(user) {
            if(!user) {
                return;
            }
            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){//call back ==> promise (an object), allows you to register the object
                    console.log(response.data);
                    if(response.data) {//$rootScope.currentUser
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");//navigate to profile page
                    }
                });
            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }
})();