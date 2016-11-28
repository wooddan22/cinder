angular.module('cinder')
    .service('salesService', function($http, $filter){
        this.test = 'test';

    var baseUrl = 'http://localhost:3000/'

    var token = JSON.parse(localStorage.getItem('cinderJwt'));
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    


    this.cancelOrder = function(token, currentUser, obId){
      return $http({
        method: 'POST',
        url: baseUrl + 'orders/cancel/' + obId,
        data: currentUser
      }).then(function(response){
        return response.data;
      })
    }

    this.getSalesOutbound = function(token, currentUserId){
      // console.log(token, currentUserId)
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/orders/?token=' + token + '&currentUserId=' + currentUserId
      }).then(function(response){
        // console.log(response);
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
        // console.log(response)
        response.data[0].date = $filter('date')(response.data[0].date, "MM-dd-yyyy")
        return response.data[0];
      })
    }

    this.getHistoryById = function(id){
      // console.log('this is the id in the svc getHistoryById', id);
      return $http({
        method: 'GET',
        url: baseUrl + 'orders/history/' + id
      }).then(function(response){
    for (var i = 0; i < response.data.body.length; i ++) {
      var tt = new Date(response.data.body[i].event_timestamp);
      if (tt.getMinutes().toString().length === 1) {
        var minutes = "0" + tt.getMinutes();
      }
      else {
        var minutes = tt.getMinutes();
      }
      if (tt.getSeconds().toString().length === 1) {
        var seconds = "0" + tt.getSeconds();
      }
      else {
        var seconds = tt.getSeconds();
      }
      response.data.body[i].event_timestamp = (tt.getMonth() + 1) + "/" + tt.getDate() + "/" + tt.getFullYear() + " " + tt.getHours() + ":" + minutes + ":" + seconds;
    }

        return response.data.body
      })
    }

    this.updateSalesOrderById = function(token, user, id){
      console.log('this is user in updateSalesOrderById', user);
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/orders/' + id + '?token=' + token + '&currentUserId=' + user.id,
        data: user
      }).then(function(response){
        console.log('response from updateSalesOrderById', response)
       return response;
      })
    }

    this.completeSalesOrderById = function(token, user, id){
      // console.log('completeSalesOrderById is hitting with id : ' + id)
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/orders/complete/' + id + '?token=' + token + '&currentUserId=' + user.id,
        data: user
      }).then(function(response){
       return ('Success!')
      })
    }
    this.createSalesOrder = function(token, user, so){
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/orders?token=' + token + '&currentUserId=' + user.id,
        data: {
               "sales_order_type_id": so.sales_order_type_id,
               "customer_id": so.customer_id.id,
               "sales_order_desc": so.sales_order_desc,
               "notes": so.notes,
               "schedule_date":so.date,
               "user": user
              }
      }).then(function(response){
        // $rootScope.$emit('obUpdated', response)
        return (response.data)
      })
    }


    this.getCustomers = function(){
      return $http({
        method: "GET",
        url: "http://localhost:3000/customers/"
      }).then(function(response){
        // console.log("your are in getCustomers callback in salesService", response.data);
        return response.data;
      })
    }

    this.logout = function(){
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/auth/logout'
      })
    }

    this.editOb = function(so){
      return $http({
        method: "PUT",
        url: 'http://localhost:3000/ob',
        data: {
    "type": so.sales_order_type_id,
    "desc": so.sales_order_desc,
    "notes": so.notes,
    "schedule_date": so.date,
    "id": so.id
}
      }).then(function(response){
        // console.log(response);
        return response;
      })
    }

    this.createCustomer = function(customer){
      return $http({
        method: "POST",
        url: baseUrl + "customers",
        data: customer
      }).then(function(response){
        return response;
      })
    }



  
    })//this is the end