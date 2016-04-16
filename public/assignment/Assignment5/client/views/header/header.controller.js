/**
 * Header Controller
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeadController);

    function HeadController($rootScope, $scope, $location, UserService){
        var model = this;
        model.$location = $location;
        model.logout = logout;

        function logout() {
            UserService
                .logoutUser()
                .then(function(response) {
                    $rootScope.user = null;
                    $location.url("/home");
                });
        }
    }
})();