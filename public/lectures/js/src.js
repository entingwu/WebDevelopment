/**
 * Created by entingwu on 2/4/16.
 */
(function() {

    //alert("Hello World!");
    var a = 2;
    var b = 4;
    var c = Math.pow(a, b);

    //alert(c);
    var fact = 1;
    for (var i = 1; i <= 5; i++) {
        fact = fact * i;
    }
    //alert("Factorial of 5 = " + fact);

    var arr = [12, 89, 54, 23, 45, 78, 90, 76, 54, 43];
    var min = arr[0];
    var max = arr[0];
    for (var j = 0; j < arr.length; j++) {
        min = Math.min(min, arr[j]);
        max = Math.max(max, arr[j]);
    }
    alert("Min :" + min);
    alert("Max :" + max);

    var min2 = minFunc(arr);
    alert("Min2: " + min2);

    function minFunc(arr) {
        var min = arr[0];
        console.log(min);
        for (var j = 0; j < arr.length; j++) {
            //console.log(arr[j]);
            min = Math.min(min, arr[j]);
        }
        return min;
    }
})();