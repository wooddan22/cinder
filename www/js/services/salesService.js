angular.module('cinder')
    .service('salesService', function($http, $rootScope, $filter){
        this.test = 'test';

    var token = JSON.parse(localStorage.getItem('cinderJwt'));
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log("Current User in svc")
    console.log(currentUser)


    this.getSalesOutbound = function(token, currentUserId){
      console.log(token, currentUserId)
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/orders/?token=' + token + '&currentUserId=' + currentUserId
      }).then(function(response){
        console.log(response);
        for (var i = 0; i < response.data.length; i++){
          response.data[i].date = $filter('date')(response.data[i].date, "MM-dd-yyyy")
        }
        return response.data;
      })}

    this.getSalesOrderById = function(token, user, id){
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/orders/' + id + '?token=' + token + '&currentUserId=' + user
      }).then(function(response){
        console.log(response)
        response.data[0].date = $filter('date')(response.data[0].date, "MM-dd-yyyy")
        return response.data[0];
      })
    }

    this.updateSalesOrderById = function(token, user, id){
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/orders/' + id + '?token=' + token + '&currentUserId=' + user
      }).then(function(response){
        $rootScope.$emit('obUpdated', response)
       return ('Success!')
      })
    }

    this.completeSalesOrderById = function(token, user, id){
      // console.log('completeSalesOrderById is hitting with id : ' + id)
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/orders/complete/' + id + '?token=' + token + '&currentUserId=' + user
      }).then(function(response){
        $rootScope.$emit('obUpdated', response)
       return ('Success!')
      })
    }
    this.createSalesOrder = function(token, user, so){
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/orders?token=' + token + '&currentUserId=' + user,
        data: {"sales_order_type_id": so.sales_order_type_id,
               "customer_id": so.customer_id.id,
               "sales_order_desc": so.sales_order_desc,
               "notes": so.notes,
               "schedule_date":so.date}
      }).then(function(response){
        $rootScope.$emit('obUpdated', response)
        return (response)
      })
    }


    this.getCustomers = function(){
      return $http({
        method: "GET",
        url: "http://localhost:3000/customers/"
      }).then(function(response){
        // console.log("your are in getCustomers in the salesService");
        // console.log(response.data);
        return response.data;
      })
    }

    this.logout = function(token, user){
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/auth/logout?id=' + user
      })
    }


  this.purchaseOrders = [{
    id: 1,
    customer: 'Delta Steel',
    img: '../img/deltaSteel.jpeg',
    order_date: 'TODAY',
    order_desc: 'Rail Car Coal Slag',
  }, {
    id: 2,
    customer: 'Little Steel',
    img: 'img/steel4.jpeg',
    order_date: '2017-9-2',
    order_desc: 'Rail Car Steel Shot',
  }];

  
    })//this is the end