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

  toastService.showSimpleToast = function(message,time){
   $mdToast.show($mdToast.simple()
     .textContent(message)
     .hideDelay(time)
     .position('top right')
     .highlightAction(true)
     .parent($document[0].querySelector('#toast-area'))
     );
 }

 toastService.showToast = function(){

 }

 return toastService;

}]);