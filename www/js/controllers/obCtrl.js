angular.module('cinder').controller('obCtrl', function($scope, $stateParams, salesService, $state, $ionicModal, $ionicPopup){
    var token = JSON.parse(localStorage.getItem('cinderJwt'));
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(token === null){
        $state.go('login')
    }
$scope.obId = Number($stateParams.id);
$scope.detailSo;   
$scope.showHistory = false;  
$scope.token = token;
$scope.currentUser = currentUser 

$scope.cancelOrder = function(obId, token, currentUser){
    console.log('You are in cancelOrder')
    $scope.showAlertCancel($scope.token, $scope.currentUser, $scope.obId);
}

$scope.obById = function(){
    salesService.getSalesOrderById(token, currentUser.id, $scope.obId).then(function(response){
        console.log("obById response", response)
        $scope.detailSo = response;
        // console.log($scope.detailSo);
    })
}

$scope.prep = function(detailSo) {
    if(detailSo.sales_order_status === 2){
        $scope.showAlert();
    }
    else{
        salesService.updateSalesOrderById(token, currentUser, detailSo.id).then(function(response){
         console.log('You are in the callback', response)
         $state.go('home');
     })
    }

     
}

$scope.complete = function(id) {
    salesService.completeSalesOrderById(token, currentUser, id).then(function(response){
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

$scope.displayHistory = function(){
    salesService.getHistoryById($scope.obId).then(function(response){
        $scope.orderHistory = response;
        $scope.showHistory = true;
    })
}

$scope.hideHistory = function(){
    $scope.showHistory = false;
}
/////////////////
///POPUP STUFF///
/////////////////

 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Please check the order status',
     template: 'This order has already been marked as prepared!'
   });

   alertPopup.then(function(res) {
     console.log('Suh dan');
   });
 }
 
 $scope.showAlertCancel = function(token, currentUser, obId) {
   console.log('token :', token, 'currentUser : ', currentUser, 'obId', obId)
   var alertPopup = $ionicPopup.confirm({
     title: 'Please Confirm',
     template: 'Are you sure that you want to cancel this order?'
   });

   alertPopup.then(function(res) {
     if(res){
         salesService.cancelOrder(token, currentUser, obId).then(function(response){
             console.log('You made it back bitch!')
             $state.go('home')
         })
     }
     else {
         console.log('yolo')
     }
   });
 }


 $ionicModal.fromTemplateUrl('./templates/obEdit.html', {
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