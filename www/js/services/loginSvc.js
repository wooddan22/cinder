angular.module('cinder').service('loginSvc', function($http){
    this.login = function(user){
        return $http({
            method: "POST",
            url: "http://localhost:3000/auth/login",
            data: user
        }).then(function(response){
            return response.data;
        })
    }
})