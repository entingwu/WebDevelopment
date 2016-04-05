(function()
{
  angular
    .module("PandaMusicApp")
		.filter('trustUrl', function ($sce) {
			return function(url) {
				return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + url);
		 };
		})
		.filter('range', function() {
			return function(val, range) {
				range = parseInt(range / 20);
				for (var i=0; i<=range; i++)
					val.push(i);
				return val;
			};
		})
    .controller("SearchController", SearchController);
    
  function SearchController($location, $rootScope, SearchService)
  {
		var model = this;
		model.$location = $location;
		model.artists = [];
		model.albums = [];
		
		model.search = function (name)
		{
			if (name != null) {
				SearchService.findArtistByName(name)
					.then(function (result) {
						console.log("successfully found artist array");
						model.artists = result.artists.items;
						console.log(model.artists);
						if (model.artists != null) {
							model.showArtist = true;	
						}
					});
			
				SearchService.findAlbumByName(name)
					.then(function (result) {
						console.log("successfully found album array");
						model.albums = result.albums.items;
						console.log(model.albums);
						if (model.albums != null) {
							model.showAlbum = true;	
						}
					});

				SearchService.findSongByName(name)
					.then(function (result) {
						console.log("successfully found song array");
						model.songs = result.tracks.items;
						console.log(model.songs);
						if (model.songs != null) {
							model.showSong = true;	
						}
					});
			}
		}
		
		model.saveArtist = function (artist)
		{
		  $rootScope.artist = artist;
			
		}
		
		model.saveAlbum = function (album)
		{
		  $rootScope.album = album;
			
		}
		
		model.saveArtist = function (artist)
		{
			console.log("save artist");
			console.log(artist);
		  $rootScope.artist= artist;	
		}
		
		model.saveSong = function (song)
		{
			console.log("save song");
			console.log(song);
		  $rootScope.song= song;
		}
		
		model.millisToMinutesAndSeconds = function (millis) {
			var minutes = Math.floor(millis / 60000);
			var seconds = ((millis % 60000) / 1000).toFixed(0);
			return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
		}
	}
})();