/* var app = express()
 * 1. passing app from require since this is already running in a server
 * 2. split applications in server into some modules dedicated to different features*/

/* node.js keyword "module", module is an object available throughout the node.js framework
 * function is now available to anyone who requires module by filename
 */
module.exports = function(app) {//var app = express()
    /* EXPRESS JS */
    /* a. GET TEXT : convention: '/api' dynamic data generated
     * it is not a file
     * create endpoint to listen to incoming url
     * '/api/hello' can invoke sayHello() */
    app.get('/api/hello', sayHello);
    function sayHello(req, res) {
        console.log('Say Hello');
        res.send('<h1>Say Hello</h1>');
    }

    /* b. GET JSON : generate dynamicly */
    app.get('/api/json', function (req, res) {
        var course = {//local json object
            title: 'Java 101',
            seats: 23,
            start: new Date()
        };
        res.json(course);//know json, no need to use send to find type
    });

    /* c. GET JSON ARRAY
    *     the new created course object saved in the server */
    var courses = [// local array courses on server
        {title: 'Java 101',      seats: 12, start: new Date()},
        {title: 'C# 101',        seats: 23, start: new Date(2015,1,23)},
        {title: 'ASP.NET 101',   seats: 34, start: new Date(2015,1,26)},
        {title: 'Node.js 101',   seats: 45, start: new Date(2015,9,5)},
        {title: 'AngularJS 101', seats: 56, start: new Date(2015,9,7)}
    ];
    app.get('/api/course', function (req, res) {
        res.json(courses);//array went back
    });

    /* d. parameter.html : which course
    * localhost:3000/apo/course/0
    * Server : Parsing Path Parameter at Server*/
    app.get('/api/course/:id', function (req, res) {
        var index = req.params.id;
        console.log(index);
        res.json(courses[index]);
    });

    /* e. post.html : use post to create new content */
    app.post('/api/course', function (req, res) {
        var newCourse = req.body;//retrieve json from body
        console.log(newCourse);
        courses.push(newCourse);//push it to the local array of courses
        res.json(courses);
    });

    /* f. delete.html : remove from the server array */
    app.delete('/api/course/:id', function (req, res) {
        var index = req.params.id;// map the variable in request
        courses.splice(index, 1);//delete course[index] * 1
        res.json(courses);
    });

    /* g. use put to update existing content */
    app.put('/api/course/:id', function (req, res) {
        var index = req.params.id;
        courses[index] = req.body;//update the instance
        res.json(courses);
    });
}