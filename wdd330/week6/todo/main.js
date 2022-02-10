// https://github.com/byui-cit/cit261/blob/gh-pages/solutions/week05/hikes.js
// https://github.com/byui-cit/cit261/tree/gh-pages/solutions/week05/mvc

/****************************************
//  FEATURES
//  - mobile first
//  - shows task list
//  - add new task
//  - toggle task complete/incomplete
//  - remove task
//  - filter on all, active, completed tasks
//  - does not allow empty task
//  - listens for enter key 
//  - MVC architecture
*****************************************/


// import model, view, controller
import Model from './todoModel.js';
import View from './todoView.js';
import Controller from './todoController.js';

// create object instances
const model = new Model('wdd330'); // key used to get and set localStorage
const view = new View('#todos'); // ul#id where tasks are displayed
const controller = new Controller(model, view);

// Why didn't I put these listeners in the controller? Initially I did, then it felt like the controller shouldn't be 
// listening for events so I refactored the program to listen outside like this to see whether it would still work. 
// Honestly, I don't know if it make more sense for listeners to be in the controller or not ???
// Although not as self contained (disadvantage) the controller is easier to read (advantage) contains less code (advantage) and 
// there is a bit more separation of responsibility (advantage)
// Either way, it's interesting to see how it can be done differently

// listen for add button
document.querySelector('#add').addEventListener('click', addNewTask);

// listen for enter key
document.querySelector('#app').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        addNewTask();
    }
});

/****************************************
//  DRY - put this code in its own function, used by both button click and key press 
*****************************************/
function addNewTask() {
    let descriptionInput = document.querySelector('#description');
    if (descriptionInput.value.trim()) {
        controller.addTodo(descriptionInput.value.trim());

        // clear text input field
        descriptionInput.value = "";

        // list has changed, reattach listeners
        addCheckboxListeners();
        addRemoveListeners();
    }
    else {
        alert('See that all these things are done in wisdom and order" Mosiah 4:27\n\n     ... Enter a description before you add a task');
        descriptionInput.focus();
    }
}

/****************************************
// listen for FILTERS
*****************************************/
const filters = document.querySelectorAll('.filter');
filters.forEach(filter => {
    // add a listener to all three filters
    filter.addEventListener('click', function (e) {
        controller.filterTodo(e.target.id); // send the selected filter to the controller
        
        // list has changed, reattach listeners
        addCheckboxListeners();
        addRemoveListeners();      
    });
});

/****************************************
// listen for checkbox change
*****************************************/
function addCheckboxListeners() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach(checkbox => {
        // loop through each checkbox and attach a listener to toggle the task status
        checkbox.addEventListener('change', function (e) {
            // get parent li id
            const id = e.target.parentNode.id;
            controller.toggleCheckbox(id);
        });
    });
}
addCheckboxListeners();

/****************************************
// listen for remove button
*****************************************/
function addRemoveListeners() {
    const buttons = document.querySelectorAll(".remove");
    buttons.forEach(button => {
        // loop through each button and attach a listener to remove the item from the todoList array
        button.addEventListener('click', function (e) {
            // get parent li id
            const id = e.target.parentNode.id;      
            controller.removeTodo(id);
            
            // list has changed, reattach listeners
            addCheckboxListeners();
            addRemoveListeners();            
        });
    });
}
addRemoveListeners();