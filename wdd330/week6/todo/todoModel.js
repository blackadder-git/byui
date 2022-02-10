// TODO APP Module
// The central component of the pattern. It is the application's dynamic data structure, independent of the user interface. 
// It directly manages the data, logic and rules of the application.

const DEBUG = false;

/****************************************
 * MODEL CLASS
*****************************************/
export default class TodoModel {

    /****************************************
    // constructor, key used to access localStorage
    *****************************************/
    constructor(key) {
        // number of incomplete tasks
        this.unfinished = 0;
  
        // used to access localStorage
        this.key = key;

        // array of tasks
        this.todoList = this.readFromLocalStorage();
    }

    /****************************************
    // filter on all tasks 
    *****************************************/
    getAllTodo() {
        this.unfinished = this.getActiveTodoCount();
        return this.todoList;
    }

    /****************************************
    // filter on unfinshed tasks
    *****************************************/    
    getActiveTodo() {
        const active = this.todoList.filter(task => task.completed == false);
        this.unfinished = active.length;
        return active;
    }

    /****************************************
    // filter on completed tasks
    *****************************************/
    getCompletedTodo() {
        const completed = this.todoList.filter(task => task.completed == true);
        this.unfinished = 0;
        return completed;
    }

    /****************************************
    // determine how many of the total tasks have yet to be completed, return count
    *****************************************/
    getActiveTodoCount() {
        this.unfinished = 0;
        this.todoList.forEach(task => {
            // task has not been marked as complete
            if (task.completed == false) {
                this.addUnfinishedTask(); // increment unfinished tasks
            }
        });

        return this.unfinished;
    }
    
    /****************************************
    // increment unfinished tasks
    *****************************************/    
    addUnfinishedTask() {
        this.unfinished++;
    }
    
    /****************************************
    // decrement unfinished tasks
    *****************************************/
    removeUnfinishedTask() {
        this.unfinished--;
    }

    /****************************************
    // update complete
    *****************************************/
    updateTodo(id) {
        // figure out what checkbox got checked (or unchecked)
        const index = this.todoList.findIndex(function(todo) {
            return todo.id == id;
        });

        if (index !== -1) { 
            if (DEBUG) console.log('DEBUG:' + id + ': ' + this.todoList[index].completed);

            // toggle checkbox
            const checked = this.todoList[index].completed == true ? false : true;
            
            // modify unfinished
            if (checked) {
                this.removeUnfinishedTask(); // decrement unfinished tasks
            }
            else {
                this.addUnfinishedTask(); // increment unfinished tasks
            }
            
            // keep id and content
            const updated = {id : this.todoList[index].id, content: this.todoList[index].content, completed: checked };

            this.todoList[index] = updated;

            if (DEBUG) console.log('DEBUG:', updated, this.todoList);

            this.writeToLocalStorage(this.todoList);
        }
    }

    /****************************************
    // add task to array
    *****************************************/
    addTodo(todo) {
        if (DEBUG) console.log('DEBUG: addTodo in model: ', todo);
        // add item to todo list
        this.todoList.push(todo);

        // increment unfinished tasks
        this.addUnfinishedTask();

        // update list, save to local storage
        this.writeToLocalStorage(this.todoList);
    }

    /****************************************
    // remove task from array
    *****************************************/
    removeTodo(id) {
        if (DEBUG) console.log('DEBUG: removeTodo in model: ' +  id);
        const index = this.todoList.findIndex(function(todo) {
            return todo.id == id;
        });

        if (index !== -1) { 
            const reset = this.todoList; // create backup copy
            try {
                // item found, remove from array
                this.todoList.splice(index, 1);

                // update list, save to local storage
                this.writeToLocalStorage(this.todoList);

                // modify unfinished
                // in case of error, this should't happen
                if (this.todoList[index].completed == false) {
                    this.removeUnfinishedTask(); // decrement unfinished tasks if unfinished is removed
                }
            } 
            catch (error) {
                console.error(error);
                this.todoList = reset; // restore the todoList
            }
        }
    }

    /****************************************
    // read from disc
    // treat function like a black box, caller expects X return X that way implementation can be 
    // changed without affecting the rest of the program
    *****************************************/
    readFromLocalStorage() { 
        if (DEBUG) console.log('DEBUG: read from localStorage');
        let todoList = JSON.parse(localStorage.getItem(this.key));
        if (todoList == null) {
            // make sure not to send back null
            todoList = []; 
        }

        return todoList; // caller expects an array
    }

    /****************************************
    // write to disc
    // browser debug dev tools | Application | Storage
    *****************************************/
    writeToLocalStorage(data) { 
        if (DEBUG) console.log('DEBUG: write to localStorage', data);
        localStorage.setItem(this.key, JSON.stringify(data));
    }    
} // END CLASS