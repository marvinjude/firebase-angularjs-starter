'use strict';

angular.module('myApp.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signup', {
		templateUrl: 'signup/signup.html',
		controller: 'signupCtrl as Signup'
	});
}])

.controller('signupCtrl', ['$window','$firebaseObject','authService','$log', function($window,$firebaseObject,authService,$log){
	var Signup = this;
	Signup.loading = false;
    
	 Signup.signUp =  function(){
	 	Signup.loading = true;
	 	authService.signUp(Signup.user.email,Signup.user.password)
	 	 .then(function(user){
	 	 	$log.log(user);
	 	 	Signup.loading = false;
	 	 })
	 	 .catch(function(e){
	 	  	$log.log(e);
	 	  	Signup.loading = false;
	 	  	//handle wrong auth details

	 	  	//handle network issue
	 	  	if(e.code ===  "auth/network-request-failed"){
	 	  		$window.alert('No Network');
	 	  	}

	 	 });
	 }  
}]);


