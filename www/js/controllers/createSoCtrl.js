angular.module('cinder').controller('createSoCtrl', function($scope, salesService, $state, $ionicPopup){
        var token = localStorage.getItem('cinderJwt');
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(token)
        if (token === null) {
            $state.go('login')
        }
        $scope.getCustomers = function(){
        console.log("you are in getCustomers")
        salesService.getCustomers().then(function(response){
            console.log('you are in getCustomers callback');
            $scope.customers = response;
            console.log('$scope.customers', $scope.customers)
        });
    },
    $scope.createSalesOrder = function(so) {
            console.log(so)
            salesService.createSalesOrder(token, currentUser, so).then(function(response){
                if(response.body !== null && response.code === 101){
                    $scope.showAlert(response);
                }
                
            })
        }

        $scope.showAlert = function (response) {
            var alertPopup = $ionicPopup.alert({
                title: 'Success!',
                template: 'Sales Order ' + response.body + ' has been created successfully.'
            });

            alertPopup.then(function () {
                    $state.go('home')
            });
        }    

    $scope.createSo;
    $scope.getCustomers();
})