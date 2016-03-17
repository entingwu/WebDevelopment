(function(){
    angular
        .module("OmdbApp")
        .controller("NavigationController", navigationController);

    function navigationController($location, UserService) {
        /* local variable vm has reference to the current controller,
        /  bind to vm : means bind to the controller instance , not to the scope */
        var vm = this;

        vm.logout = logout;

        function init() {//when the constructor is called
            //bind variable to the controller, then it can access from the view
            vm.$location = $location;
        }
        init();

        /* LOG OUT */
        function logout() {//log out server
            UserService
                .logout()//null
                .then(function(){
                    UserService.setCurrentUser(null);//client side also no user
                    $location.url("/home");
                });
        }
    }
})();
