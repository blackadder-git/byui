/********************************************
 * Controller 
 *******************************************/

const DEBUG = true;

export default class Controller {

    /****************************************
    // constructor
    *****************************************/
    constructor(model, view) {
        this.model = model;
        this.view = view;
    
        // add listeners
        this.addPancakeListener();
    }

    addPancakeListener() {
        document.querySelector('#makePancakes').addEventListener('click', (e) => {
            if (DEBUG) console.log('make pancakes');
            alert(e.currentTarget.getAttribute('data-syrup'));

            // simulate mouse click
            window.location.href = 'js/views/pancakes.html';
            // exit;

            // simulate HTTP redirect
            // removes URL of the current document from document history, making it impossible to "back" button back to the original document
            // window.location.replace('views/pancakes.html');            
        });
    }

} // end class