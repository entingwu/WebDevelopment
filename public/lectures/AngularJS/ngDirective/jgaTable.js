/**
 * Created by entingwu on 2/18/16.
 */
// jgaTable.js
(function(){

    // declares directive in
    // custom module
    angular
        .module("jgaTable", [])
        .directive("jgaTable", jgaTable);

    // implements directive
    // templateUrl refers to template file
    function jgaTable() {
        return {
            templateUrl: "jgaTable.html"
        };
    }
})();