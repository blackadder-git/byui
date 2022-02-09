export default class TodoView {

    // elementId = ul where items should be added, lsKey = for localStorage
    constructor(listElement) {
        this.listElement = document.querySelector(listElement);
    }

    // build an li element from each task
    renderTodoList(listElement, list) {
        console.log('show todo list');

        //this.completed = list.length;

        // get ul element
        let ul = document.querySelector(listElement);

        // clear list
        ul.innerHTML = '';

        // rebuild list from current array
        list.forEach((task, index) => {
            const li = document.createElement('li');
            li.setAttribute('id', task.id);
            const checked = (task.completed == true) ? 'checked' : '';

            li.innerHTML = `<input type="checkbox" id="description${index}" ${checked}>
                            <label for="description${index}" class="strikethrough">${task.content}</label>
                            <button class="remove">X</button>`;
            ul.appendChild(li);
        });
    }

    // show the number of unfinished tasks
    renderTasksLeft(unfinished) {
        console.log('tasks left = ' + unfinished);
        let tasksLeft = document.querySelector('#numTasks');

        // only add s if there is more than 1 task to complete
        const plural = unfinished != 1 ? 's' : '';

        tasksLeft.textContent = `${unfinished} task${plural} left`;
    }
}