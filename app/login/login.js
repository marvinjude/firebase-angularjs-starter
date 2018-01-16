'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'loginCtrl',
		controllerAs: 'Login'
	});
}])

.controller('loginCtrl', ['authService','$window','$log', function(authService,$window,$log){
	var Login = this;
	Login.loading = false;

	Login.login  = function(){
		Login.loading = true;
		authService.login(Login.user.email,Login.user.password)
		.then(function(user){$log.log(user.uid);
			Login.loading = false;
			$window.location.href = "#!/home";
		})
		.catch(function(e){
			$log.log(e); 
			Login.loading = false;
	 	   	  //handle wrong auth details
	 	   	  

	 	  	//handle network issue
	 	  	if(e.code ===  "auth/network-request-failed"){
	 	  		$window.alert('No Network');
	 	  	}
	 	  });
	}
}]);


