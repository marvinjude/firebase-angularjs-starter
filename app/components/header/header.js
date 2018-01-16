'use strict';

angular.module('myApp.header', ['myApp.header.header-directive'])

// .value('version', '0.1');
.controller('headerController',['$scope','sidebartoggleService',function($scope,sidebartoggleService){
     $scope.toggleNav = function(){
        sidebartoggleService.toggleLeft();
     }
}])