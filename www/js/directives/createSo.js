angular.module('cinder').directive('createSo', function(){

return {
    templateUrl: './templates/createSoDirective.html',
    restrict: 'E',
    controller: function($scope, salesService, $state) {
            $scope.getCustomers = function(){
        salesService.getCustomers().then(function(response){
            // console.log(response);
            $scope.customers = response;
            // console.log($scope.customers)
        });
    },
    $scope.createSalesOrder = function(so) {
            console.log(so)
            salesService.createSalesOrder(so).then(function(response){
                $state.go('home')
            })
        }
    $scope.createSo;
    $scope.getCustomers();
    }
}




});