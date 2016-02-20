/**
 * Created by entingwu on 2/17/16.
 */
/**
 * 3.An AngularJS application is implemented using the .module() method.
 *    var app = angular.module("WhiteBoardApp",[]);
 * a. a string denoting the name of the application.
 * b. an array of other modules the application depends on.
 *
 * The array can be empty if the application does not depend on other modules.
 * There can be any number of modules depending on other modules in a dependency hierarchy.
 * The module declared in ng-app is the one module that represents the application.
 */

/* 4. Implement the AngularJS Application and Controller
 *   var app = angular.module("HelloWorldApp",[]);
 *   app.controller("HelloWorldController", TheController);
 *   function TheController() {...}
 *
 *   Use the .controller() method to name and declare a function that implements the controller.
 *   a. a string used to name the controller.
 *   b. the function that implements the controller.
 *   The name of the controller must match the name used in the HTML that references it.
 *
 *   Controller no overlap. Each is independent. Scope
 * */
(function(){
    //var app = angular.module("MovieDBApp",[]);
    angular
        .module("MovieDBApp",["ngRoute"])
        .controller("MovieListController",function($scope){
            var movies = [
                {id:111, title: "hello world", year:2008, description:"hello world"},
                {id:222, title: "star war", year:2015, description:"star war"},
                {id:333, title: "avatar", year:2015, description:"avatar"},
            ];
            /* 5. Controller Sends Data to View
             * To provide data to the client browser, the controller can request an object representation of the HTML it is responsible for,
             * a representation of its scope of influence.
             * To do this, the function that implements the controller declares a variable specifically called $scope.
             * The function can then refer to named placeholders and objects declared in view. */
            $scope.movies = movies;

            $scope.addMovie = function(item) {
                //console.log("add movie triggered!");
                //console.log(movie);

                console.log("addMovie");
                var new_movie = {//create a new one, not reference
                    id: item.id,
                    title: item.title,
                    year: item.year,
                    description: item.description
                }
                $scope.movies.push(new_movie);
            }

            $scope.delMovie=function(index) {
                //delete a movie from movies
                console.log(index);
                $scope.movies.splice(index,1);//1 就是从表中delete 1个movie
            }

            $scope.selMovie=function(movie, index) {//item pass movie

                $scope.selectedMovieIndex = index;//global
                $scope.item = {//same as ng-model in html
                    id: movie.id,
                    title: movie.title,
                    year: movie.year,
                    description: movie.description
                };
                $scope.selectedMovieIndex = $scope.movies.indexOf(movie)
            }

            $scope.updateMovie=function(item) {
                console.log("update movie at" + $scope.selectedMovieIndex);
                $scope.movies[$scope.selectedMovieIndex] = {
                    id: item.id,
                    title: item.title,
                    year: item.year,
                    description: item.description
                }

            }

        });

})();