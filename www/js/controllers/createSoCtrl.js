angular.module('cinder').controller('createSoCtrl', function($scope, salesService, $state){
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
            salesService.createSalesOrder(token, currentUser.id, so).then(function(response){
                console.log('you are in createSalesOrder callback in ctrl', response)
                $state.go('home')
            })
        }
    $scope.createSo;
    $scope.getCustomers();
})