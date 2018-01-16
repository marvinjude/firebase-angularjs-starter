angular.module('myApp.toastService', [])
.factory('toastService',['$mdToast', '$document' ,function($mdToast,$document){
  /*
   * This is Where Sweet toasts are creted
   */
   var toastService = {};

   var last = {
    bottom: false,
    top: true,
    left: false,
    right: true
  }

  toastService.showSimpleToast = function(message){
   $mdToast.show($mdToast.simple()
     .textContent(message)
     .hideDelay(1000)
     .position('top right')
     .highlightAction(true)
     .parent($document[0].querySelector('#toast-area'))
     );
 }

 toastService.showToast = function(){

 }

 return toastService;

}]);