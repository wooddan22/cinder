angular.module('cinder')
    .service('salesService', function($http, $rootScope, $filter){
        this.test = 'test';



    this.getSalesOutbound = function(){
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/orders'
      }).then(function(response){
        for (var i = 0; i < response.data.length; i++){
          response.data[i].date = $filter('date')(response.data[i].date, "MM-dd-yyyy")
        }
        // console.log(response.data);
        return response.data;
      })}

    this.getSalesOrderById = function(id){
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/orders/' + id
      }).then(function(response){
        console.log(response)
        response.data[0].date = $filter('date')(response.data[0].date, "MM-dd-yyyy")
        return response.data[0];
      })
    }

    this.updateSalesOrderById = function(id){
      // console.log('service : ' + id)
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/orders/' + id
      }).then(function(response){
        $rootScope.$emit('obUpdated', response)
       return ('Success!')
      })
    }

    this.completeSalesOrderById = function(id){
      // console.log('completeSalesOrderById is hitting with id : ' + id)
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/orders/complete/' + id
      }).then(function(response){
        $rootScope.$emit('obUpdated', response)
       return ('Success!')
      })
    }
    this.createSalesOrder = function(so){
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/orders',
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