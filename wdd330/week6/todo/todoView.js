// TODO APP View
// Any representation of information such as a chart, diagram or table. Multiple views of the same information 
// are possible, such as a bar chart for management and a tabular view for accountants.

const DEBUG = false;

/****************************************
 * VIEW CLASS
*****************************************/
export default class TodoView {

    /****************************************
    // listElement identifies the ul where tasks are displayed
    *****************************************/
    constructor(listElement) {
        this.ul = document.querySelector(listElement);
    }

    /****************************************
    // build li element for each task
    *****************************************/
    renderTodoList(list) {
        if (DEBUG) console.log('DEBUG: show todo list');

        // clear list
        this.ul.innerHTML = '';

        // rebuild list from current array
        list.forEach((task, index) => {
            const li = document.createElement('li');
            li.setAttribute('id', task.id);

            // has task been completed
            const checked = (task.completed == true) ? 'checked' : '';

            // fill in li element
            li.innerHTML = `<input type="checkbox" id="description${index}" ${checked}>
                            <label for="description${index}" class="strikethrough">${task.content}</label>
                            <button class="remove">X</button>`;
            this.ul.appendChild(li);
        });
    }

    /****************************************
    // show number of unfinished tasks
    *****************************************/
    renderTasksLeft(unfinished) {
        if (DEBUG) console.log('DEBUG: tasks left = ' + unfinished);
        
        let tasksLeft = document.querySelector('#numTasks'); // TODO: better to pass in the id ?

        // only add s if there is more than 1 task to complete
        const plural = unfinished != 1 ? 's' : '';

        tasksLeft.textContent = `${unfinished} task${plural} left`;
    }

    /****************************************
    // change active filter style
    *****************************************/
    renderActiveFilter(filter) {
        // disactivate active filter style
        const filters = document.querySelectorAll('.filter');
        filters.forEach(filter => {
            filter.classList.remove('selected');
        });

        // show current filter as active
        document.querySelector("#" + filter).classList.add('selected');
    }

} // END CLASS