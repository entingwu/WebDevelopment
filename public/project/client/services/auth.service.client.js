(function() {
	angular
		.module("MusicPlayerApp")
		.factory('Auth', Auth);

	function Auth($http, $q, $rootScope) {
		var service = {
			getAccessToken : getAccessToken,
			setAccessToken : setAccessToken,
			getUsername : getUsername,
			setUsername : setUsername,
			getUserCountry : getUserCountry,
			setUserCountry : setUserCountry
		};
		return service;

		function getAccessToken() {
			var token = localStorage.getItem('mp_token');
			var deferred = $q.defer();
			$http.get('/api/project/token')
				.success(function(response) {
					setAccessToken(response, 3600);
					deferred.resolve(response);
				});
			return deferred.promise;
		}

		function setAccessToken(token, expires_in) {
			$rootScope.token = token;
			localStorage.setItem('mp_token', $rootScope.token);
			localStorage.setItem('mp_expires', (new Date()).getTime() + expires_in);
		}

		function getUsername() {
			var username = localStorage.getItem('mp_username', '');
			return username;
		}

		function setUsername(username) {
			localStorage.setItem('mp_username', username);
		}

		function getUserCountry() {
			var userCountry = localStorage.getItem('mp_usercountry', 'US');
			return userCountry;
		}

		function setUserCountry(userCountry) {
			localStorage.setItem('mp_usercountry', userCountry);
		}
	}

})();
