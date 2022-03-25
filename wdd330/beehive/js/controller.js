/********************************************
 * Controller 
 *******************************************/

 const DEBUG = true;

 import Model from './model.js';
 import View from './view.js';

 export default class Controller {
 
    /****************************************
     * constructor
     *****************************************/
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // add listeners
        this.editFamilyListener();
        this.editPantryListener();
        this.editRecipeListener();

        this.getFamilyMembers();
        this.getPantryItems();
        this.getRecipes();
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

    // show family members
    getFamilyMembers() {
        // get family members
        const family = this.model.readFromLocalStorage('family');
        this.view.buildFamilyTable(family);
    }

    getPantryItems() {

    }

    getRecipes() {

    }
 
 } // end class