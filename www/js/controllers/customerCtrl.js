angular.module('cinder').controller('customerCtrl', function($scope, $state, salesService) {

$scope.getCustomers = function(){
    salesService.getCustomers().then(function(response){
        $scope.customers = response;
        console.log('$scope.customers = ', $scope.customers)
    })
}

$scope.createCustomer = function(customer){
    salesService.createCustomer(customer).then(function(response){
        $state.go('customers');
    })
}

$scope.getCustomers();
})