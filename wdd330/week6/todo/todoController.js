// TODO APP Controller
// Accepts input and converts it to commands for the model or view

const DEBUG = false;

/****************************************
 * CONTROLLER CLASS
*****************************************/
export default class Controller {

    /****************************************
    //
    *****************************************/
    constructor(model, view) {
        // model
        this.model = model;
        this.list = this.model.getAllTodo(); // get data

        // view
        this.view = view;
        this.filterTodo('filterAll');
    }

    /****************************************
    // decide which set of tasks to display based on the selected filter
    *****************************************/
    filterTodo(filter) {
        let tasks = [];
        let unfinished = 0;
        switch(filter) {
            case 'filterActive':
                tasks = this.model.getActiveTodo();
                unfinished = this.model.getActiveTodoCount();
                break;
            case 'filterCompleted':
                tasks = this.model.getCompletedTodo();
                unfinished = 0;
                break;
            default:
                // filterAll
                tasks = this.model.getAllTodo();
                unfinished = this.model.getActiveTodoCount();
        }
        this.view.renderTodoList(tasks);
        this.view.renderTasksLeft(unfinished); // update tasks left
        this.view.renderActiveFilter(filter);
    }

    /****************************************
    // updates model when a task is checked or unchecked, reflects change in # tasks left
    *****************************************/
    toggleCheckbox(id) {
        this.model.updateTodo(id);
        this.view.renderTasksLeft(this.model.getActiveTodoCount()); // update tasks left
    }

    /****************************************
    // uses id of task to remove it from the list and rerender the page
    *****************************************/
    removeTodo(id) {
        // pass id to model
        this.model.removeTodo(id);

        // show updated list
        this.filterTodo('filterAll');
    }

    /****************************************
    // creates a new task, rerenders the task list
    *****************************************/
    addTodo(description) {
        if (DEBUG) console.log('DEBUG: this object contains:', this);
        const todo = {id : Date.now(), content: description, completed: false };

        // add task to list
        this.model.addTodo(todo);

        // show updated list
        this.filterTodo('filterAll');
    }
} // END CLASS