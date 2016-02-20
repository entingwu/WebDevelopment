/**
 * Created by entingwu on 2/18/16.
 */
(function()
{
    angular
        .module("WhiteBoardApp")
        .controller("courseOverview.controller", courseOverviewController);

    function courseOverviewController($scope, $routeParams, CourseService)
    {
        console.log($routeParams.index);
        var course_index = $routeParams.index;
        var my_course = CourseService.getCourseById(course_index);
        $scope.hello = "Hello Course: " + my_course.title;
    }
})();