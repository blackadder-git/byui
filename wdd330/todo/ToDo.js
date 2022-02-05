// import localstorage helper functions
import { readFromLS, writeToLS } from './ls.js';

// import localstorage helper functions
import { qs, onTouch } from './utilities.js';

// Add a variable to store our list of tasks
let todoList = null;

// Add a Todos class to the Todos.js file, and make it the default export for the module
export default class Todo {
    // in the constructor set a variable with the element our todo list will be built in, 
    // and the key we will use to read/write from localStorage

    constructor(elementId, key) {
      //this.parentElement = document.getElementById(elementId); // reference to a UI element
      // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
      //this.backButton = this.buildBackButton();
      this.listTodos();

      document.querySelector('#add').addEventListener('click', this.addTodo.bind(this), false);
    }

    /*
    Complete Todos.listTodos()
    Add a method to the Todos class called listTodos(). It should use the renderTodoList function to output our todo list when called.
    It should get called when a todo is added, or removed, and when the Todos class is instantiated.
    */
    listTodos() {
        this.renderTodoList();
    }


    /*
    Create the renderTodoList(list, element) function
    /* foreach todo in list, build a li element for the todo, and append it to element
    @param {array} list The list of tasks to render to HTML @param {element} element The DOM element to insert our list elements into.

    */
    renderTodoList(list, element) {
        //alert('renderTodoList');
    }

    /*
    Complete Todos.addTodo()
    Add a method to the Todos class called addTodo. It should grab the input in the html where users enter the text of the task, then send that along with the key to a SaveTodo() function. Then update the display with the current list of tasks
    */
    // Bind Todos.addTodo to the Add button on our add todo form in the html.
    addTodo() {
        alert('class bind');
        //this.listTodos();
    }


    // Complete Todos.completeTodo()
    completeTodo() {

    }

    // Complete Todos.removeTodo()
    removeTodo() {
        this.listTodos();
    }

    // Complete Todos.filterTodos()
    filterTodos() {

    }
    

}



/*
Create saveTodo(task, key)
In the Todo.js module, but not in the Todos class, create the following function
/* build a todo object, add it to the todoList, and save the new list to local storage.
@param {string} key The key under which the value is stored under in LS @param {string} task The text of the task to be saved.
*/
function saveTodo(task, key) { 
    // A todo should look like this: { id : timestamp, content: string, completed: bool }
    writeToLS();
}

/*
In the Todos.js module, but not in the Todos class create the following function
/* check the contents of todoList, a local variable containing a list of ToDos. If it is null then pull the list of todos from localstorage, 
update the local variable, and return it
@param {string} key The key under which the value is stored under in LS @return {array} The value as an array of objects
*/
function getTodos(key) { 
    readFromLS();
}