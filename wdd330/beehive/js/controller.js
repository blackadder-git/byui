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
        this.addFamilyListener();
        this.addPantryListener();
        this.addRecipeListener();
        this.addMealplanListener();        

        // get section data
        this.getFamilyMembers();
        this.getPantryItems();
        this.getRecipes();

        this.openModalListener();
        this.closeModalListener();
    }
 
    hello () {
        alert('Aye matey ...');
    }

    // redirect to family view
    addFamilyListener() {
        if (DEBUG) console.log('add family listener');

        document.querySelector('#addFamily').addEventListener('click', (e) => {
            window.location.href = 'views/family.html';
        });
    }

    // redirect to pantry view
    addPantryListener() {
        if (DEBUG) console.log('add pantry listener');

        document.querySelector('#addPantry').addEventListener('click', (e) => {
            window.location.href = 'views/pantry.html';            
        });
    }

    // redirect to cookbook view
    addRecipeListener() {
        if (DEBUG) console.log('add recipe listener');

        document.querySelector('#addRecipe').addEventListener('click', (e) => {
            window.location.href = 'views/recipe.html';
        });
    }

    // redirect to mealplan view
    addMealplanListener() {
        if (DEBUG) console.log('add mealplan listener');

        document.querySelector('#addMealplan').addEventListener('click', (e) => {
            window.location.href = 'views/mealplan.html';
        });
    }    

    // open modal dialog
    openModalListener() {
        if (DEBUG) console.log('open modal listener');

        const modals = document.querySelectorAll('.openModal');

        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (DEBUG) console.log('show modal');
                let modalWindow = document.querySelector('#modal');
                const showModal = e.currentTarget.getAttribute('data-id');
                switch(showModal) {
                    case 'family' :
                        this.showFamilyModal(modalWindow);
                    break;
                    case 'pantry' :
                        this.showPantryModal(modalWindow);
                    break;
                    case 'recipes' :
                        this.showRecipesModal(modalWindow);
                    break;
                }

                document.querySelector("#modal").classList.add("is-visible");
                            
            });
        });
    }

    // close modal dialog
    closeModalListener() {
        if (DEBUG) console.log('close modal');

        document.querySelector('.closeModal').addEventListener('click', (e) => {
            document.querySelector("#modal").classList.remove("is-visible");
            //document.querySelector(`#${e.currentTarget.getAttribute('data-id')}`).classList.remove("is-visible");
        });
    }

    // fill modal with content from household
    showFamilyModal(modal) {
        if (DEBUG) console.log('show family modal');

        document.querySelector('.modal-header h2').textContent = 'Your household contains:';
        const family = this.model.readFromLocalStorage('family');
        this.view.buildFamilyTable(family);
    }

    // fill modal with content from pantry
    showPantryModal(modal) {
        if (DEBUG) console.log('show pantry modal');

        document.querySelector('.modal-header h2').textContent = 'Your pantry contains:';
        const pantry = this.model.readFromLocalStorage('pantry');
        this.view.buildPantryList(pantry);
    }

    // fill modal with content from recipe
    showRecipesModal(modal) {
        if (DEBUG) console.log('show recipe modal');

        document.querySelector('.modal-header h2').textContent = 'Your cookbook contains:';
        const recipes = this.model.readFromLocalStorage('recipes');
        this.view.buildRecipeList(recipes);    
    }

    // fill dashboard with content from family
    getFamilyMembers() {
        if (DEBUG) console.log('get family members');

        const family = this.model.readFromLocalStorage('family');
        // call function to calculate calories based on family
        const calories = this.model.getCalories(family);
        // https://www.dietaryguidelines.gov/sites/default/files/2021-03/Dietary_Guidelines_for_Americans-2020-2025.pdf
        // https://www.apa.org/obesity-guideline/estimated-calorie-needs.pdf
        this.view.showNumberInHousehold(family.length, calories);
    }

    // fill dashboard with content from pantry
    getPantryItems() {
        if (DEBUG) console.log('get pantry items');

        const pantry = this.model.readFromLocalStorage('pantry');
        // TODO: call function to loop items in pantry
        // organize list by type
        this.view.showNumberInPantry(pantry.length);
    }

    // fill dashboard with content from recipes
    getRecipes() {
        if (DEBUG) console.log('get recipes');

        const recipes = this.model.readFromLocalStorage('recipes');
        // TODO: call function to loop items in pantry
        // organize list by type
        this.view.showNumberOfRecipes(recipes.length);
    }
 
 } // end class