angular.module('myApp.authService', [])
.factory('authService',['$firebaseAuth','$log', function($firebaseAuth,$log){
  /*
   * This Handles All The Damn Hassle Around SignUp
  */

    var authService = {};
    var authObj = $firebaseAuth();

  	authService.signUp = function(email,password){
  		return authObj.$createUserWithEmailAndPassword(email,password);
	 	  
  	}

    authService.logout  = function(){
       authObj.$signOut();
    }

    authService.login  = function(email,password){
       return authObj.$signInWithEmailAndPassword(email,password);
    }

    authService.auth = function(){
    	return authObj;
    }
    
    authService.getUid  = function(){
      return authObj.$getAuth().uid;
    }
    return authService;
  
}]);