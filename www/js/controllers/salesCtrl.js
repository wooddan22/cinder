angular.module('cinder')
    .controller('mainCtrl', function($scope, $stateParams, salesService, $state, $rootScope) {

        $scope.salesOutbound;
        $scope.getSalesOb = function(){
        //    console.log('were in salesCtrl')
            salesService.getSalesOutbound().then(function(response){
                $scope.salesOutbound = response;
                // console.log($scope.salesOutbound);
                $state.reload();
            })
        };

        // $scope.createSalesOrder = function(so) {
        //     console.log(so)
        //     salesService.createSalesOrder(so).then(function(response){
        //         console.log(response);
        //         $state.go('home')
        //     })
        // }
        

        $rootScope.$on('obUpdated', function(event, data) {
            $scope.getSalesOb();
        })

        $scope.purchaseOrders = salesService.purchaseOrders;

        $scope.filterFunction = function(value) {
            return value.status === 1 || value.status === 2;
         }
        
        $scope.getSalesOb();
        
       


    }
    
    
    )