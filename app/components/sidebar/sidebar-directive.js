'use strict';

angular.module('myApp.sidebar.sidebar-directive', [])

.directive('appSidebar', [function() {

  return {
       templateUrl:   "components/sidebar/sidebar.html",
       controller :   "sidebar-controller"
   };

}]);
