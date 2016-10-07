angular.module('cinder')
    .controller('purchaseCtrl', function($scope, $stateParams, purchaseSvc, $state) {
        $scope.getPoList = function() {
            $scope.poList = purchaseSvc.purchaseOrders;
        }
    })