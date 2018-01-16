angular.module('myApp.sidebartoggleService', [])
.factory('sidebartoggleService',['$mdSidenav', '$document' ,function($mdSidenav,$document){
  
   var sToggleService = {};

   sToggleService.toggleLeft = buildToggler('left');
   sToggleService.toggleRight = buildToggler('right');


   function buildToggler(componentId){
      return function(){
        $mdSidenav(componentId).toggle();   
      }
   }

   return sToggleService;

}]);