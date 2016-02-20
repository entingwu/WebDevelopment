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
        .module("MovieDBApp",[])
        .controller("MovieListController", MovieListController);

    function MovieListController($scope){
        // local variable in controller
        var movies = [
            {id: 111, title: "Avatar", year:2007, description:"Avatar"},
            {id: 222, title: "Star Wars", year:2015, description:"Star Wars"},
            {id: 333, title: "Gone with the wind", year:1949, description:"Gone with the wind"},
        ];
        /* 5. Controller Sends Data to View
         * To provide data to the client browser, the controller can request an object representation of the HTML it is responsible for,
         * a representation of its scope of influence.
         * To do this, the function that implements the controller declares a variable specifically called $scope.
         * The function can then refer to named placeholders and objects declared in view. */
        $scope.movies = movies;

        /* 6. Event Handlers Declarations */
        $scope.addMovie = addMovie;
        $scope.delMovie = delMovie;
        //$scope.removeMovie = removeMovie;
        $scope.selMovie = selMovie;
        $scope.updateMovie = updateMovie;


        /* 7. Event Handlers Implementations */
        /* a. add Movie : two way blinding. */
        function addMovie(movie) {
            var new_movie = {//create a new one, not reference
                id: movie.id,
                title: movie.title,
                year: movie.year,
                description: movie.description
            }
            $scope.movie = {};
            $scope.movies.push(new_movie);

            /* Bound to the object:  console.log($scope.movie);  $scope.movies.push($scope.movie);*/
        }

        /* b. del Movie : Model change, view render again */
        function delMovie(index) {//delete a movie from movies
            //console.log(index);
            $scope.movies.splice(index,1);//1 就是从表中delete 1个movie
        }
        //way 2: ng-click="removeMovie(movie)"
        function removeMovie(movie) {
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index,1);
        }

        /* c. select Movie : remember which one is select */
        function selMovie(movie) {
            $scope.selectedMovieIndex = $scope.movies.indexOf(movie);
            $scope.movie = {//copy of movie,not bound
                id: movie.id,
                title: movie.title,
                year: movie.year,
                description: movie.description
            };
        }

        /* d. update Movie */
        function updateMovie(movie) {
            //update the movie sub index
            $scope.movies[$scope.selectedMovieIndex] = {
                id: movie.id,
                title: movie.title,
                year: movie.year,
                description: movie.description
            };
        }

    }

})();