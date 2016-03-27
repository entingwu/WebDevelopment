//http://api.jqueryui.com/sortable/#event-start
(function(){
    angular
        .module("jgaSortable", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
        var start = null;
        var end = null;

        /* 1. element is a jquery(jqline) object ,
           $(element) : grep the jquery representation of tbody
           .sortable({}) : makes all rows inside tbody sortable
            only inside tbody jga-sortable , angularJs knows about the new order */
        /* 2. scope : access to users in tbody
        *  3. attributes : any attributes of root like jga-axis="y" being passed to me,
        *     camel case in javascript and lowercase- in html
        *  4. after drag : update the array and notify angular that the model has changed*/

        function link($scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                axis: jgaAxis,
                start: function(event, ui) {//ui is a high level object represent has been dragged
                    start = ui.item.index();//find current item index, sibling relationship
                },
                stop: function(event, ui) {
                    end = ui.item.index();//new index
                    /* swap : modify array */
                    var temp = $scope.fields[start];
                    $scope.fields[start] = scope.fields[end];
                    $scope.fields[end] = temp;
                    /* notify angular the model has been changed. Render new array, update dom */
                    $scope.$apply();
                }
            });
        }
        /* directly link to the dom */
        return {
            require: "^ngController",
            link: link
        }
    }
})();
