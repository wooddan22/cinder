angular.module('cinder').controller('obCtrl', function($scope, $stateParams, salesService, $state){

$scope.obId = Number($stateParams.id);
$scope.detailSo;       

$scope.obById = function(id){
    salesService.getSalesOrderById(id).then(function(response){
        $scope.detailSo = response;
        // console.log($scope.detailSo);
    })
}

$scope.prep = function(id) {
    // console.log('controller: ' + id)
     salesService.updateSalesOrderById(id).then(function(response){
        //  console.log(response)
         $state.go('home');
     })
}

$scope.complete = function(id) {
    salesService.completeSalesOrderById(id).then(function(response){
        // console.log("You are back in the $scope.complete function in the obCtrl")
        $state.go('home');
    })
 }


$scope.obById($scope.obId);
})