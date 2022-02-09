export default class TodoModel {

    constructor(key) {
        // number of completed tasks
        this.unfinished = 0;
  
        this.key = key;
        this.todoList = this.readFromLocalStorage();

    }

    getTodo() {
        this.countUnfinishedTasks();
        return this.todoList;
    }

    // filter on unfinshed tasks
    getActiveTodo() {
        const active = this.todoList.filter(task => task.completed == false);
        this.unfinished = active.length;
        return active;
    }

    // filter on completed tasks
    getCompletedTodo() {
        const completed = this.todoList.filter(task => task.completed == true);
        this.unfinished = 0;
        return completed;
    }

    countUnfinishedTasks() {
        this.unfinished = 0;
        this.todoList.forEach(task => {
            // task has not been marked as complete
            if (task.completed == false) {
                this.addUnfinishedTask(); // increment unfinished tasks
            }
        });        
    }

    getUnfinishedTasks() {
        this.countUnfinishedTasks();
        return this.unfinished;
    }
    
    // increment unfinished tasks
    addUnfinishedTask() {
        this.unfinished++;
    }
    
    // decrement unfinished tasks
    removeUnfinishedTask() {
        this.unfinished--;
    }

    // update complete
    updateTodo(id) {
        const index = this.todoList.findIndex(function(todo) {
            return todo.id == id;
        });

        if (index !== -1) { 
            console.log(id + ': ' + this.todoList[index].completed);

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
            console.log(updated, this.todoList);

            this.writeToLocalStorage(this.todoList);
        }
    }


    // add task to array
    addTodo(todo) {
        console.log('addTodo in model');
        // add item to todo list
        this.todoList.push(todo);

        this.addUnfinishedTask(); // increment unfinished tasks

        // update list, save to local storage
        this.writeToLocalStorage(this.todoList);
    }

    // remove task from array
    removeTodo(id) {
        console.log('removeTodo in model: ' +  id);
        const index = this.todoList.findIndex(function(todo) {
            return todo.id == id;
        });

        if (index !== -1) { 
            // modify unfinished
            if (this.todoList[index].completed == false) {
                // TODO: in case of error, would this be better to run after the list is actually updated ?
                this.removeUnfinishedTask(); // decrement unfinished tasks if unfinished is removed
            }

            // item found, remove from array
            this.todoList.splice(index, 1);

            // update list, save to local storage
            this.writeToLocalStorage(this.todoList);
        }
    }

    // read from disc
    readFromLocalStorage() { 
        //console.log('read from localStorage');
        let todoList = JSON.parse(localStorage.getItem(this.key));
        if (todoList == null) {
            todoList = []; // make sure not to send back null
        }
        /*
        else {
            this.countUnfinishedTasks();
            /*
            todoList.forEach(task => {
                // task has not been marked as complete
                if (task.completed == false) {
                    this.addUnfinishedTask(); // increment unfinished tasks
                }
            });
            * /
        }*/
        return todoList;
    }

    // write to disc
    writeToLocalStorage(data) { 
        //console.log('write to localStorage');
        // Debug: to view, check dev tools | Application | Storage
        localStorage.setItem(this.key, JSON.stringify(data));
    }    
}