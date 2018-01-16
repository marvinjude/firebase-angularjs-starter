'use strict';

angular.module('myApp.header.header-directive', [])

.directive('appHeader', [function() {

  return {
       templateUrl: "components/header/header.html",
       controller: 'headerController'
  };

}]);
