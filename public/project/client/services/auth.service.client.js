(function() {
	angular
		.module("MusicPlayerApp")
		.factory('Auth', Auth);

	function Auth($http, $q, $rootScope) {
		var service = {
			getAccessToken : getAccessToken,
			setAccessToken : setAccessToken
		};
		return service;

		function getAccessToken() {
			var deferred = $q.defer();
			$http.get('/api/project/token')
				.success(function(response) {
					$rootScope.token = response;
					console.log("get token: "+ response);
					deferred.resolve(response);
				});
			return deferred.promise;
		}

		function setAccessToken(token, expires_in) {
			console.log($rootScope.token);
			localStorage.setItem('pa_token', $rootScope.token);
			localStorage.setItem('pa_expires', (new Date()).getTime() + expires_in);
		}

		/*function getUsername() {
			var username = localStorage.getItem('pa_username', '');
			return username;
		}

		function setUsername(username) {
			localStorage.setItem('pa_username', username);
		}

		function getUserCountry() {
			var userCountry = localStorage.getItem('pa_usercountry', 'US');
			return userCountry;
		}

		function setUserCountry(userCountry) {
			localStorage.setItem('pa_usercountry', userCountry);
		}*/
	}

})();
