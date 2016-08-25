angular.module('cinder').controller('loginCtrl', function($scope, $state,loginSvc) {
 
$scope.login = function(user) {
    loginSvc.login(user).then(function(response){
        // console.log(response);
        $state.go('home')
        
        localStorage.setItem('currentUser', JSON.stringify(response[0]));
        localStorage.setItem('cinderJwt', JSON.stringify(response[1]));
        

    })
}

})