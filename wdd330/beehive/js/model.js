const DEBUG = true;

/****************************************
 * MODEL CLASS
*****************************************/
export default class Model {

    /****************************************
    // read from disc
    // treat function like a black box, caller expects X return X that way implementation can be 
    // changed without affecting the rest of the program
    *****************************************/
    readFromLocalStorage(key) { 
        if (DEBUG) console.log('DEBUG: read from localStorage', key);

        let data = JSON.parse(localStorage.getItem(key));
        
        if (data == null) {
            // make sure not to send back null
            data = []; 
        }

        return data; // caller expects an array
    }

    /****************************************
    // write to disc
    // browser debug dev tools | Application | Storage
    *****************************************/
    writeToLocalStorage(data, key) { 
        if (DEBUG) console.log('DEBUG: write to localStorage', data, key);

        localStorage.setItem(key, JSON.stringify(data));
    }

} // END CLASS