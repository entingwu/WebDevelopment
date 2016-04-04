(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $routeParams) {
        $scope.id = $routeParams.id;
    }
})();
