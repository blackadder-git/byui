// controller

import Model from './todoModel.js';
import View from './todoView.js';

export default class Todo {

    /**
     * class constructor
     * @param  {String} key used to access localStorage
     * @param  {String} listElement ul identifer
     * @return none
     */
    constructor(key, listElement) {
        // model
        this.key = key;
        this.model = new Model(this.key);
        this.list = this.model.getTodo(); // get data

        // view
        this.listElement = listElement;
        this.view = new View(this.listElement);
        this.view.renderTodoList(listElement, this.list); // show data
        this.view.renderTasksLeft(this.model.getUnfinishedTasks()); // show tasks left

        // listeners
        this.addListeners();
        this.addAllListener(); // filter all
        this.addActiveListener(); // filter incomplete
        this.addCompletedListener(); // filter completed
        this.addButtonListener(); // listen to add button
        this.addEnterListener(); // listen for enter key
    }

    // listen for the enter key
    addEnterListener() {
        document.querySelector('#app').addEventListener('keydown', function(e) {
            if (e.keyCode === 13) {
                console.log('ahoy');
                // e.preventDefault();
                // e.stopImmediatePropagation();
                this.addTodo();
            }

        }.bind(this), false); // bind this object to addTodo()
    }

    // show all tasks
    addAllListener() {
        document.querySelector('#filterAll').addEventListener('click', function (e) {
            // console.log('filter active');
            const allTasks = this.model.getTodo();
            this.view.renderTodoList(this.listElement, allTasks);
            this.view.renderTasksLeft(this.model.getUnfinishedTasks()); // update tasks left
            this.addListeners();

        }.bind(this), false); // bind this object to removeTodo()
    }

    // show only incomplete tasks
    addActiveListener() {
        document.querySelector('#filterActive').addEventListener('click', function (e) {
            // console.log('filter active');
            const activeTasks = this.model.getActiveTodo();
            this.view.renderTodoList(this.listElement, activeTasks);
            this.view.renderTasksLeft(this.model.getUnfinishedTasks()); // update tasks left
            this.addListeners();

        }.bind(this), false); // bind this object to removeTodo()
    }

    // show only completed tasks
    addCompletedListener() {
        document.querySelector('#filterCompleted').addEventListener('click', function (e) {
            // console.log('filter completed');
            const completedTasks = this.model.getCompletedTodo();
            this.view.renderTodoList(this.listElement, completedTasks);
            this.view.renderTasksLeft(0); // update tasks left, completed is always 0
            this.addListeners();

        }.bind(this), false); // bind this object to removeTodo()
    }

    // add checkbox and remove button listeners
    addListeners() {
        this.addCheckboxListener();
        this.addRemoveListener();
    }

    // loop items, add checkbox listeners
    addCheckboxListener() {
        const checkboxes = document.querySelectorAll("input[type=checkbox]");

        checkboxes.forEach(checkbox => {
            // loop through each button and attach a listener to remove the item from the todoList array
            checkbox.addEventListener('change', function (e) {
                // get parent li id
                let id = e.target.parentNode.id;
                console.log('changed: ' + id);
                this.model.updateTodo(id);
                this.view.renderTasksLeft(this.model.getUnfinishedTasks()); // update tasks left

            }.bind(this), false); // pass this object to removeTodo()
        });

    }

    // loop items, add button listeners
    addRemoveListener () {
        const buttons = document.querySelectorAll(".remove");
        buttons.forEach(button => {
            // loop through each button and attach a listener, bind this object to removeTodo()
            button.addEventListener('click', this.removeTodo.bind(this));

            /*
            // uses an anonymous function to do the same thing as above (remove item when button clicked)
            button.addEventListener('click', function (e) {
                // get parent li id
                let id = e.target.parentNode.id;
                // pass id to model
                this.model.removeTodo(id);

                // list count has changed, show updated list
                this.view.renderTodoList(this.listElement, this.list);
                this.addListeners();

            }.bind(this), false); // bind this object to removeTodo()
            
            WHY NOT USE AN ANONOMOUS FUNCTION ?
            https://gomakethings.com/named-vs-anonymous-event-listener-functions/
            */
        });
    }

    // function is bound to this object in the event listener, called each time a remove button is clicked
    removeTodo(e) {
        // get target id
        let id = e.target.parentNode.id;

        // pass id to model
        this.model.removeTodo(id);

        // list count has changed, show updated list
        this.view.renderTodoList(this.listElement, this.list);
        this.view.renderTasksLeft(this.model.getUnfinishedTasks()); // update tasks left
        this.addListeners();
    }

    // add listener to add item button
    addButtonListener() {
        document.querySelector('#add').addEventListener('click', this.addTodo.bind(this)); // bind this object to addTodo())
    }

    // function has access to object elements because it is bound to this in the event listener
    addTodo() {
        console.log('this object contains:', this);
        let descriptionInput = document.querySelector('#description');

        // check input for content
        if (descriptionInput.value.trim()) {
            const todo = {id : Date.now(), content: descriptionInput.value.trim(), completed: false };

            // add task to list
            this.model.addTodo(todo);

            // clear text input field
            descriptionInput.value = "";

            // list count has changed, show updated list
            this.view.renderTodoList(this.listElement, this.list);
            this.view.renderTasksLeft(this.model.getUnfinishedTasks()); // update tasks left
            this.addListeners();
        }
        else {
            console.log('looks empty to me');
        }
    }
}