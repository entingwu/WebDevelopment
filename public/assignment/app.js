/**
 * Angular applications are created by declaring a base module using the angular.module() function which allows
 * configuring dependencies with other modules. We'll declare a dependency with the angular routing module which
 * will allow us to configure navigation
 */
(function(){
    angular
        .module("FormBuilderApp",["ngRoute"]);
})();