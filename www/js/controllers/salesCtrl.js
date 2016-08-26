angular.module('cinder')
    .controller('mainCtrl', function($scope, $stateParams, salesService, $state, $rootScope) {
        var token = JSON.parse(localStorage.getItem('cinderJwt'));
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log(currentUser);
        // console.log(token);
        if (token === null) {
            $state.go('login')
        }
        $scope.salesOutbound;
        $scope.getSalesOb = function(token, user){
            console.log(token, user)
            salesService.getSalesOutbound(token, user).then(function(response){
                $scope.salesOutbound = response;
            })
        };

        // $rootScope.$on('obUpdated', function(event, data) {
        //     $scope.getSalesOb(token, currentUser[0].id);
        // })

        $scope.purchaseOrders = salesService.purchaseOrders;

        // $scope.filterFunction = function(value) {
        //     return value.status === 1 || value.status === 2;
        //  }
        $scope.getSalesOb(token, currentUser.id);
    
        $scope.logout = function(){
            salesService.logout().then(function(response){
                localStorage.removeItem('currentUser');
                localStorage.removeItem('cinderJwt')
                $state.go('login');
            })
        }
})