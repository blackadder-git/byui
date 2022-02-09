// localstorage helpers
// todo: { id : timestamp, content: string, completed: bool }
// toDoList = [toDo]

/*
start with two...may add more later
/
read a value from local storage and parse it as JSON @param {string} key The key under which the value is stored under in LS
@return {array} The value as an array of objects /
*/
export function readFromLS(key) { 
    let todoList = JSON.parse(localStorage.getItem(key));
    if (todoList == null) {
        todoList = []; // make sure not to send back null
    }
    return todoList;
}

/*
write an array of objects to local storage under the provided key @param {string} key The key under which the value is stored 
under in LS
* @param {array} data The information to be stored as an array of objects. Must be serialized.
*/
export function writeToLS(key, data) { 
    // check dev tools | Application | Storage to see these
    localStorage.setItem(key, JSON.stringify(data));
}