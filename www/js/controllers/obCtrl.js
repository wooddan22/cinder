angular.module('cinder').controller('obCtrl', function($scope, $stateParams, salesService, $state, $ionicModal){
    var token = JSON.parse(localStorage.getItem('cinderJwt'));
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(token === null){
        $state.go('login')
    }
$scope.obId = Number($stateParams.id);
$scope.detailSo;       


$scope.obById = function(id){
    salesService.getSalesOrderById(token, currentUser.id, $scope.obId).then(function(response){
        console.log(token, currentUser, id)
        $scope.detailSo = response;
        // console.log($scope.detailSo);
    })
}

$scope.prep = function(id) {
     salesService.updateSalesOrderById(token, currentUser.id, id).then(function(response){
         $state.go('home');
     })
}

$scope.complete = function(id) {
    salesService.completeSalesOrderById(token, currentUser.id, id).then(function(response){
        // console.log("You are back in the $scope.complete function in the obCtrl")
        $state.go('home');
    })
 }

$scope.editOb = function(so){
    so.id = $scope.obId;
    console.log(so);
    console.log($scope.detailSo);

    so = {
        date: so.date || $scope.detailSo.date,
        id: so.id, 
        notes: so.notes || $scope.detailSo.notes,
        sales_order_desc: so.sales_order_desc || $scope.detailSo.order_desc,
        sales_order_type_id: so.sales_order_type_id || $scope.detailSo.type
    }

    console.log(so);
    salesService.editOb(so).then(function(){
        $scope.closeModal();
        $state.go('home')
    })
} 

 $ionicModal.fromTemplateUrl('../templates/obEdit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


$scope.obById($scope.obId);
})