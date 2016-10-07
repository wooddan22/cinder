angular.module('cinder').service('purchaseSvc', function($http){
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
})