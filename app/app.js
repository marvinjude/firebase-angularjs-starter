'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',  
  'ngAnimate',
  'ngMaterial',
  'myApp.login',
  'myApp.home',
  'myApp.signup',
  'myApp.header',
  'myApp.sidebar',
  'myApp.appMock',
  'myApp.todoService',
  'angularMoment', 
  'firebase',
  'myApp.authService',
  'myApp.toastService',
  'ng-mfb',
  'ngImageInputWithPreview'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  //Since Logout Is Just A Route, It should be Declared Here in App Js Unlike Other Routes
  $routeProvider.when('/logout',{
    templateUrl: 'login/login.html',
    controller: 'loginCtrl',
    controllerAs: 'Login',
     //Do This Before Loading This Route
     resolve:{
        "logout": ['authService',function(authService){
            authService.logout();
        }]
     }
  })
  
     .otherwise({redirectTo: '/home'});
}])

.run(['$rootScope','$location', function($rootScope, $location) {

  $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      console.log("Error in Auth");
      $location.path("/login");
    }
  })
}]);


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCCmirXebI1WyIzplMc3Tocbo3Wmj5ou9s",
    authDomain: "todolistonsteriod.firebaseapp.com",
    databaseURL: "https://todolistonsteriod.firebaseio.com",
    projectId: "todolistonsteriod",
    storageBucket: "todolistonsteriod.appspot.com",
    messagingSenderId: "68601086798"
  };
  firebase.initializeApp(config);

