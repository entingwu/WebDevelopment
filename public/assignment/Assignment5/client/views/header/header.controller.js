(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeadController);

    function HeadController($rootScope, $scope, $location, UserService){
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            UserService
                .logoutUser()
                .then(
                    function(response) {
                        console.log("logout!");
                        $rootScope.user = null;
                        $location.url("/home");
                        console.log($location.url());
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();