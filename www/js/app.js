// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('cinder', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  
})

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

    .state('home', {
    cache: false,
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'mainCtrl'
  })
  .state('obDetail', {
    cache: false,
    url: '/obDetail/:id',
    templateUrl: 'templates/obDetail.html',
    controller: 'obCtrl'
  })
   .state('createSo', {
    cache: false,
    url: '/createSo',
    templateUrl: 'templates/createSo.html',
    controller: 'createSoCtrl'
  })
   .state('login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
    .state('purchase', {
    cache: false,
    url: '/purchase',
    templateUrl: 'templates/purchase.html',
    controller: 'purchaseCtrl'
  })
  .state('customers', {
    cache: false,
    url: '/customers',
    templateUrl: 'templates/customers.html',
    controller: 'customerCtrl'
  })
  .state('createCustomer',{
    cache: false,
    url: '/createCustomer',
    templateUrl: 'templates/createCustomer.html',
    controller: 'customerCtrl'
  })
 
$urlRouterProvider.otherwise('/login');
})





    
  // if none of the above states are matched, use this as the fallback


