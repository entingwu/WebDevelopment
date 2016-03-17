(function(){
    angular
        .module("OmdbApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location, $routeParams) {
        var vm = this;

        var username = $routeParams.username;
        console.log(username);

        /* When it is not login, try to protect the profile */
        function init() {
            var currentUser = UserService.getCurrentUser();
            if(currentUser == null) {
                $location.url("/home");
            }
        }
        function init() {
            UserService
                .getProfile()//retrieve profile information
                .then(function (response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });
        }
        return init();
    }
})();