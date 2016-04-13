(function() {
	var module = angular.module("MusicPlayerApp");

	module.factory('Auth', function($http, $q, $rootScope) {

		var CLIENT_ID = 'a01456fd1d3c421c935f5416b4e8f6ed';
		var CLIENT_SECRET = '0ad115a138454f15a218669be93ef07c';
		var REDIRECT_URI = 'http://localhost:3000/callback';

		/*if (location.host == 'localhost:3000') {
			CLIENT_ID =	'409f070cb44945d9a85e9b4ad8fa3bf1';
			REDIRECT_URI = 'http://localhost:3000/callback.html';
		} else {
			CLIENT_ID = '9714921402b84783b2a207f1b6e82612';
			REDIRECT_URI = 'http://lab.possan.se/thirtify/callback.html';
		}*/
		/*function getLoginURL(scopes) {
			return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID
				+ '&redirect_uri=' + encodeURIComponent(REDIRECT_URI)
				+ '&scope=' + encodeURIComponent(scopes.join(' '))
				+ '&response_type=token';
		}*/

		return {
			/*openLogin: function() {
				var url = getLoginURL([
					'user-read-private',
					'playlist-read-private',
					'playlist-modify-public',
					'playlist-modify-private',
					'user-library-read',
					'user-library-modify',
					'user-follow-read',
					'user-follow-modify'
				]);

				var width = 450,
						height = 730,
						left = (screen.width / 2) - (width / 2),
						top = (screen.height / 2) - (height / 2);

				var w = window.open(url,
						'Spotify',
						'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
				);
			},*/
			getAccessToken: function() {
				var deferred = $q.defer();
				$http.get('/api/project/token')
					.success(function(response) {
						$rootScope.token = response;
						console.log("get token: "+ response);
						deferred.resolve(response);
					});
				return deferred.promise;
			},
			setAccessToken: function(token, expires_in) {
				console.log($rootScope.token);
				localStorage.setItem('pa_token', $rootScope.token);
				localStorage.setItem('pa_expires', (new Date()).getTime() + expires_in);
			},
			getUsername: function() {
				var username = localStorage.getItem('pa_username', '');
				return username;
			},
			setUsername: function(username) {
				localStorage.setItem('pa_username', username);
			},
			getUserCountry: function() {
				var userCountry = localStorage.getItem('pa_usercountry', 'US');
				return userCountry;
			},
			setUserCountry: function(userCountry) {
				localStorage.setItem('pa_usercountry', userCountry);
			}
		}
	});

})();
