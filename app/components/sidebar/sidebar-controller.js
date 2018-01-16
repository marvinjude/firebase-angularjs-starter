angular.module('myApp.sidebar.ctrl', [])

 .controller('sidebar-controller', ['$timeout','$scope','$log','sidebartoggleService','$mdSidenav',function($timeout,$scope,$log,sidebartoggleService,$mdSidenav){
     
     // $timeout(()=>{sidebartoggleService.toggleLeft()},3000);

     $scope.toggleNav = function(){
     	sidebartoggleService.toggleLeft();
     }
         
 }]);  