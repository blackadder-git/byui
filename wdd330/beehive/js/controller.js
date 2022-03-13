/********************************************
 * Controller 
 *******************************************/

 const DEBUG = true;

 export default class Controller {
 
    /****************************************
     * constructor
     *****************************************/
    constructor() {
        // add listeners
        this.editFamilyListener();
        this.editPantryListener();
        this.editRecipeListener();
    }
 
    hello () {
        alert('Aye matey ...');
    }

    editFamilyListener() {
        document.querySelector('#editFamily').addEventListener('click', (e) => {
            if (DEBUG) console.log('edit family');

            window.location.href = 'views/family.html';
        });
    }

    editPantryListener() {
        document.querySelector('#editPantry').addEventListener('click', (e) => {
            if (DEBUG) console.log('edit pantry');

            window.location.href = 'views/pantry.html';            
        });
    }

    editRecipeListener() {
        document.querySelector('#editRecipe').addEventListener('click', (e) => {
            if (DEBUG) console.log('edit recipe');

            window.location.href = 'views/recipe.html';
        });
    }
 
 } // end class