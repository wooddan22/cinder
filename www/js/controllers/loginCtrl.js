angular.module('cinder').controller('loginCtrl', function($scope, $state,loginSvc) {
 
$scope.login = function(user) {
    loginSvc.login(user).then(function(response){
        if (response[0].status === 200) {

        localStorage.setItem('currentUser', JSON.stringify(response[1]));
        localStorage.setItem('cinderJwt', JSON.stringify(response[2]));
        $state.go('home')
            // if(response.data.errorCode === 1) $scope.emailVisible = false;
            // else if(response.data.errorCode === 2) $scope.passwordVisible = false;
        }
        else {
             if(response[0].errorCode === 1) $scope.emailVisible = false;
            else if(response[0].errorCode === 2) $scope.passwordVisible = false;
        // localStorage.setItem('currentUser', JSON.stringify(response.data[0]));
        // localStorage.setItem('cinderJwt', JSON.stringify(response.data[1]));
        // $state.go('home')
        }

    })
}

$scope.emailVisible = true;
$scope.passwordVisible = true;
})