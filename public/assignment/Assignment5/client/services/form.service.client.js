(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($http, $q) {
        var service = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            findFormById : findFormById,
            updateFormById : updateFormById,
            deleteFormById : deleteFormById

        };
        return service;

        function createFormForUser(userId, form) {
            var deferred = $q.defer();
            $http
                .post('/api/assignment/user/' + userId + '/form', form)
                .success(function(response) {
                    console.log("create form in client" + response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();
            $http
                .get('/api/assignment/user/' + userId + '/form')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findFormById(formId) {
            var deferred = $q.defer();
            $http
                .get('/api/assignment/form/' + formId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var deferred = $q.defer();
            $http
                .put('/api/assignment/form/' + formId, newForm)
                .then(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFormById(formId) {
            var deferred = $q.defer();
            $http
                .delete('/api/assignment/form/' + formId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();
