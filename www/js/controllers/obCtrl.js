angular.module('cinder').controller('obCtrl', function($scope, $stateParams, salesService, $state){
    var token = JSON.parse(localStorage.getItem('cinderJwt'));
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(token === null){
        $state.go('login')
    }
$scope.obId = Number($stateParams.id);
$scope.detailSo;       


$scope.obById = function(id){
    salesService.getSalesOrderById(token, currentUser[0].id, $scope.obId).then(function(response){
        console.log(token, currentUser, id)
        $scope.detailSo = response;
        // console.log($scope.detailSo);
    })
}

$scope.prep = function(id) {
     salesService.updateSalesOrderById(token, currentUser[0].id, id).then(function(response){
         $state.go('home');
     })
}

$scope.complete = function(id) {
    salesService.completeSalesOrderById(token, currentUser[0].id, id).then(function(response){
        // console.log("You are back in the $scope.complete function in the obCtrl")
        $state.go('home');
    })
 }


$scope.obById($scope.obId);
})