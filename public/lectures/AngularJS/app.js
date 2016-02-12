/**
 * Created by entingwu on 2/11/16.
 */
(function(){
    angular
        .module("WhiteBoardApp",["ngRoute"])//use base one
        .controller("MovieTableController",function($scope){
            var movies = [
                {id:111, title: "hello world", year:2008, description:"hello world"},
                {id:222, title: "star war", year:2015, description:"star war"},
                {id:333, title: "avatar", year:2015, description:"avatar"},
        ];
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