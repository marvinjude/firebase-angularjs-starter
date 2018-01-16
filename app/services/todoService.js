angular.module('myApp.todoService', [])
.service('todoService',['$firebaseObject', 'authService' ,function($firebaseObject,authService){
	var userTodos = [];

  //get user id from authservice and fetch the reference
  var ref = firebase.database().ref(authService.getUid());
	//fetch data on that reference
	var obj = $firebaseObject(ref);

	obj.$loaded(data=> userTodos = data.todos);


	obj.$watch((eventSnapShot)=>{
       //show added toast
       //show removed toast
       //(child_added, child_moved, child_removed, or child_changed)
       //{ event: "child_added", key: "<new_id>", prevId: "<prev_id>" }
	});
		
	 ////////////////////////
	//todos Service Methods//
    ////////////////////////

    this.getTodos = function(){
    	return userTodos;
    }
    this.setTodos = function(t){
    	userTodos = t;
    	obj.todos = userTodos;
    	obj.$save();
    }
    this.getTodosLength  = function(){
    	return userTodos.length || 0;
    }
    


    // Returns a Promise That Gets Fulfiled only whrn the data firebase is loaded 
    this.loadingState = function(){
      return obj.$loaded();
    }

}]);