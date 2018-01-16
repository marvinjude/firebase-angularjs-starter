'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'todoController as todo',
		resolve: {
			"currentAuth":['authService', function(authService){
				let auth = authService.auth(); 
				return auth.$requireSignIn();
			}],

			"userTodos" : function(){
				return {
					somedata: false
				}
			}
		}
	});
}])

.controller('todoController', ['$timeout', '$log', 'moment','todoService','authService','$mdToast','toastService', function($timeout,$log,moment,todoService,authService,$mdToast,toastService){
	var todo = this;
	var auth = authService.auth();
    todo.user = null;
    //
    todo.isloadingdata = true;
 
    //
    todoService.loadingState().then(function(){
    	todo.isloadingdata = false;
    });


	auth.$onAuthStateChanged(function(user){
		todo.user = user;
		//redirect location to login
	});


	todo.todo_mode = 'Enter TODO';
	todo.button_val = 'Add Item';
	todo.button_state = 'add';
	todo.cur_edit_index = undefined;
	todo.showundo = false;
	todo.category = 'uncategorized';
	todo.timeago = new Date();
		//hold the info about an empty cregort;
		todo.empty_cat_state_message = undefined;

		todo.nonsense_text = `pls type in your life goals here so you can keep
		track of your life from now on, how coolis that 
		track of your life from now on, how coolis that`;

		todo.todos = todoService.getTodos();

		todo.addItem = function(){
			let title = todo.todo_title;
			if(todo.todos.length >= 10){
				alert("cant be greater  Than 10 pls");
			}
			else{
				if(todo.button_state === 'save'){
					todo.todos[todo.cur_edit_index].title = todo.todo_title;
					todo.todos[todo.cur_edit_index].category = todo.category;
					todo.todo_title = '';
					todo.todo_mode = 'Enter TODO';
					todo.button_val = 'Add Item';
					todo.button_state = 'add';
					todo.cur_edit_index = undefined;
				}else{
					todo.todos.push({title:title, category: todo.category, dateCreated : new Date()});
					todo.todo_title = '';
				}
				
			}
			todo.refresh();
		}
		//Update Backup From Data
		todo.refresh = function(){
		   // todo.backup = [];
		   // angular.copy(todo.todos,todo.backup);
		   todoService.setTodos(todo.todos);
		}
		//Update Data From Backup
		todo.update = function(){
			todo.todos = [];
		  // angular.copy(todo.backup,todo.todos);
		  todo.todos = todoService.getTodos();
		}
		todo.markFavorite = function(){
			todo.todos.forEach((i)=>{
				if(i.done){
					i.favourite = !i.favourite;
					i.done = false;
				}
			});
			todo.refresh();
		}

		todo.editItem = function(index){
			todo.todo_title = todo.todos[index].title;
			todo.todo_mode = 'Edit Todo';
			todo.button_val = 'Save';
			todo.button_state = 'save';
			todo.cur_edit_index = index;
			todo.category = todo.todos[index].category;
			todo.refresh();
		}
		todo.markItems = function(){
			todo.todos.forEach((i)=>{
				i.done = todo.mark_all;
			});
		}
		todo.deleteMarked = function(){
			todo.todos = todo.todos.filter((i) =>{
				return !i.done;
			});
			todo.refresh();
		}
		todo.toggleItemsCompleted = function(){
			todo.todos.forEach((i)=>{
				if(i.done){
					i.completed = !i.completed;
					i.done = false;
				}
			});
			todo.refresh();
		}
		todo.removeItem = function(index){
			todo.todos.splice(index, 1);
			todo.refresh();
		}
		todo.filerByCategory = function(category){
			todo.update();
			if(category !=  'all'){
				todo.todos = todo.todos.filter((i) =>{
					return i.category == category;
				});
				if(todo.todos.length == 0){
					todo.empty_cat_state_message =  `There Are Not Todos In This Category(${category})`;
				}else{
					todo.empty_cat_state_message = undefined;
				}
			}else{
				if(todo.todos.length >  0){
					todo.empty_cat_state_message = undefined;
				}
			}
		}

		todo.fetchTodoLengthByCategory = function(category){
			if(category == 'all')
				return todoService.getTodosLength();

			let count = 0; 
			for(let i = 0; i < todoService.getTodosLength(); i++){
				if (todoService.getTodos()[i].category == category){
					count+=1;
				}
			}
			return count;
		}

		todo.getLength =function(){
			return todoService.getTodosLength();
		}

		toastService.showSimpleToast('worked');
		
	}]);