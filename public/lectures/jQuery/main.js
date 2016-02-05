/**
 * Created by entingwu on 2/4/16.
 */
//main function : immediately invoke this function expression
(function(){
    $(init);

    function init(){
        console.log("Hello jQuery");
        print();

        $("#clickBtn").click(function()
        {
            alert("hello");
        });
        $("#appendMe").append("Hello").append("Is there anyone out there?");

//http://www.myapifilms.com/imdb/idIMDB?title=star+war&token=75b86ca2-31e7-4727-b482-e3c30dc802dd&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0

        var movieTitle = $("#movieTitle");
        var db_search_url = "http://www.myapifilms.com/imdb/idIMDB?title=";
        var auth = "&token=75b86ca2-31e7-4727-b482-e3c30dc802dd&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0";

        $("#searchMovie").click(function() {
            var title = movieTitle.val();
            console.log("title:" + title);

            var search_url = db_search_url+title+auth;

            $.ajax({
                url: search_url,
                dataType:"jsonp",
                success: searchMovie
            });
        });

        function searchMovie(rep) {
            console.log(rep);
        }

        function renderMoviesWithTemplate(response) {
            var movies = response.data.movies;
            console.log("renderMoviesWithTemplate");
            tbody.empty();
            for(var m in movies) {
                var movie = movies[m];
                var title = movie.title;
                var plot = movie.plot;
                var posterUrl = movie.urlPoster;
                var imdbUrl = movie.urlMDB;

                var tr = template.clone();
                tr.find(".link").attr("href", imdbUrl);
                tr.find(".plot").html(plot);
                tr.find(".poster").attr("src");
            }
        }

        function renderMovies(result) {
            var movie = movies[m];
            var title = movie.title;
            var plot = movie.plot;
            var posterUrl = movie.urlPoster;
            var imdbUrl = movie.urlMDB;

            var tr = $("<tr>");
            var titleLink = $("<a>").attr("href",imdbUrl).html(title);
            var titleTd = $("<td>").append(titleLink);
            var plotTd = $("<td>") + plot + "</td>";
            var img = $("<img>").attr("src",posterUrl);
            var posterTd = $("<td>").append(img);

            tr.append(titleTd);
            tr.append(plotTd);
            tr.append(posterTd);

            tbody.append(tr);

        }


        var json = {"data":{"movies":[{"title":"The Matrix ","originalTitle":"","year":"1999","releaseDate":"19990331",
            "directors":[{"name":"Andy Wachowski","nameId":"nm0905152"},{"name":"Lana Wachowski","nameId":"nm0905154"}],
            "writers":[{"name":"Andy Wachowski","nameId":"nm0905152"},{"name":"Lana Wachowski","nameId":"nm0905154"}],
            "runtime":["136 min"],"urlPoster":"http://ia.media-imdb.com/images/M/MV5BMTkxNDYxOTA4M15BMl5BanBnXkFtZTgwNTk0NzQxMTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "countries":["USA","Australia"],"languages":["English"],"genres":["Action","Sci-Fi"],
            "plot":"Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and " +
            "by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. Morpheus awakens Neo to the real world, a ravaged wasteland where most of humanity have been captured by a race of machines that live off of the humans' body heat and electrochemical energy and who imprison their minds within an artificial reality known as the Matrix. As a rebel against the machines, Neo must return to the Matrix and confront the agents: super-powerful computer programs devoted to snuffing out Neo and the entire human rebellion.","simplePlot":"A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.","idIMDB":"tt0133093","urlIMDB":"http://www.imdb.com/title/tt0133093","rating":"8.7","metascore":"73","filmingLocations":["AON Tower","Kent Street","Sydney","New South Wales","Australia"],"rated":"R","votes":"1,151,473","type":"Movie"}]},"about":{"version":"2.13.0"}};

    }

    function print() {
        console.log("print");
    }
})();