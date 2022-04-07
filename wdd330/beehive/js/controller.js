/********************************************
 * Controller 
 * 
 * TODO: 
 * add settings with conversion class for US/Metric measurement
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
        this.getNumFamilyMembers();
        this.getNumPantryItems();
        this.getNumShoppingList();        
        this.getNumRecipes();
        this.getNumMealplans();        

        this.openModalListener();
        this.closeModalListener();
    }
 
    hello () {
        alert('Aye matey ...');
    }

    // redirect to family view
    addFamilyListener() {
        if (DEBUG) console.log('add family listener');

        // multiple links may appear if no household members appear in the modal
        const redirects = document.querySelectorAll('.addFamily');
        redirects.forEach(redirect => {
            redirect.addEventListener('click', (e) => {
                window.location.href = 'views/family.html';
            });
        });
    }

    // redirect to pantry view
    addPantryListener() {
        if (DEBUG) console.log('add pantry listener');

        // multiple links may appear if no items appear in the modal
        const redirects = document.querySelectorAll('.addPantry');
        redirects.forEach(redirect => {
            redirect.addEventListener('click', (e) => {
                window.location.href = 'views/pantry.html';
            });
        });
    }

    // redirect to cookbook view
    addRecipeListener() {
        if (DEBUG) console.log('add recipe listener');

        // multiple links may appear if no recipes appear in the modal
        const redirects = document.querySelectorAll('.addRecipe');
        redirects.forEach(redirect => {
            redirect.addEventListener('click', (e) => {
                window.location.href = 'views/recipe.html';
            });
        });
    }

    // redirect to mealplan view
    addMealplanListener() {
        if (DEBUG) console.log('add mealplan listener');

        // multiple links may appear if no plan appears in the modal
        const redirects = document.querySelectorAll('.addMealplan');
        redirects.forEach(redirect => {
            redirect.addEventListener('click', (e) => {
                window.location.href = 'views/mealplan.html';
            });
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
                        this.addFamilyListener();
                    break;
                    case 'pantry' :
                        this.showPantryModal(modalWindow);
                        this.addPantryListener();
                    break;
                    case 'shopping' :
                        this.showShoppingModal(modalWindow);
                    break;                    
                    case 'recipes' :
                        this.showRecipesModal(modalWindow);
                        this.addRecipeListener();
                    break;
                    case 'mealplans' :
                        this.showMealplanModal(modalWindow);
                        this.addMealplanListener();
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
        });
    }

    // fill modal with content from household
    showFamilyModal(modal) {
        if (DEBUG) console.log('show family modal');
       
        const family = this.model.readFromLocalStorage('family');
        this.view.buildFamilyTable(family);
    }

    // fill modal with content from pantry
    showPantryModal(modal) {
        if (DEBUG) console.log('show pantry modal');

        const pantry = this.model.readFromLocalStorage('pantry');
        this.view.buildPantryTable(pantry);
    }

    // fill modal with content from shopping list
    showShoppingModal(modal) {
        if (DEBUG) console.log('show shopping modal');

        const shopping = this.model.readFromLocalStorage('shopping');
        this.view.buildShoppingTable(shopping);
    }    

    // fill modal with content from recipe
    showRecipesModal(modal) {
        if (DEBUG) console.log('show recipe modal');

        const recipes = this.model.readFromLocalStorage('recipes');
        this.view.buildRecipeTable(recipes);    
    }

    // fill modal with content from recipe
    showMealplanModal(modal) {
        if (DEBUG) console.log('show mealplans modal');

        const mealplans = this.model.readFromLocalStorage('mealplans');
        this.view.buildMealplanTable(mealplans);    
    }    

    // fill dashboard with content from family
    getNumFamilyMembers() {
        if (DEBUG) console.log('get family members');

        const family = this.model.readFromLocalStorage('family');
        // calculate calories based on family
        const calories = this.model.getCalories(family);
        this.view.showNumberInHousehold(family.length, calories);
    }

    // fill dashboard with content from pantry
    getNumPantryItems() {
        if (DEBUG) console.log('get pantry items');

        const pantry = this.model.readFromLocalStorage('pantry');
        this.view.showNumberInPantry(pantry.length);
    }

    // fill dashboard with content from pantry
    getNumShoppingList() {
        if (DEBUG) console.log('get shopping list');

        const shopping = this.model.readFromLocalStorage('shopping');
        this.view.showNumberShoppingList(shopping.length);

        // TEMP
        // *******************************
        // here for testing but this really should run each time an item is modified in the pantry or a new week is added to the meal plan
        // *******************************
        // get meal plans
        /*
        const mealplans = this.model.readFromLocalStorage('mealplans');

        // calculate number or times each recipe is needed per year
        let meals = this.getMealsPerYear(mealplans);

        // calculate quantity of each item in recipe
        let ingredients = this.getIngredientsPerYear(meals);

        // save shopping list
        this.model.writeToLocalStorage(ingredients, 'shopping');
        */
        // check pantry 

        // show difference

        // END TEMP
    }    

    // calculate number of times each recipe is needed per year
    getMealsPerYear(mealplans) {
        if (DEBUG) console.log('get meals per year');

        let meals = [];

        let count = mealplans.length;
        const timesPerYear = Math.floor(52 / mealplans.length);
        if (DEBUG) console.log('TIME', timesPerYear);
        const evenWeeks = ((52 % mealplans.length) == 0) ? 0 : 2 % mealplans.length; 

        // get recipes
        mealplans.forEach(week => {
            console.log('WEEK', week);
            // convert week object to array
            Object.entries(week).forEach(day => {
                // only get days with meals
                if (day[1].length >= 1) {
                    console.log('DAY', day);
                    day[1].forEach(meal => {
                        if (DEBUG) console.log('MEAL', meal);
                        // <div class="" draggable="true" data-calories="7283" data-recipeid="1649341477733" title="7283 calories">Brownie</div>
                        let start = meal.search('data-recipeid') + 15;
                        let end = start + 13;
                        let recipeid = meal.slice(start, end); // slice recipe id
                        if (DEBUG) console.log('RECIPE', recipeid);

                        // is recipe already in array
                        if (recipeid in meals) {
                            // yes, is it the last week
                            if (count == 1 && evenWeeks != 0) {
                                // last week
                                meals[recipeid] += timesPerYear + (52 % mealplans.length);
                                if (DEBUG) console.log('last', timesPerYear + (52 % mealplans.length), meals);
                            }
                            // no
                            else {
                                meals[recipeid] += timesPerYear;
                                if (DEBUG) console.log('not last', timesPerYear, meals[recipeid]);
                            }
                        }
                        // no, this is a new recipe
                        else {
                            // is it the last week
                            if (count == 1 && evenWeeks != 0) {
                                // last week
                                meals[recipeid] = timesPerYear + (52 % mealplans.length);
                                if (DEBUG) console.log('last', timesPerYear + (52 % mealplans.length), meals);
                            }
                            // no, it is a regular week
                            else {
                                meals[recipeid] = timesPerYear;
                                if (DEBUG) console.log('not last', timesPerYear, meals[recipeid]);
                            }                

                            meals[recipeid] = 1;
                            if (DEBUG) console.log('NEW', meals[recipeid] += timesPerYear);
                        }
                    });
                }
                // day is missing meals
            });

            // count down the week
            count--;
        });

        if (DEBUG) console.log('MEALS PER YEAR', meals);

        return meals;
    }

    // calculate quantity of each item in recipe
    getIngredientsPerYear(meals) {
        if (DEBUG) console.log('get ingredients per year');

        let ingredients = [];

        const recipes = this.model.readFromLocalStorage('recipes');

        console.log(recipes);
        // get recipes
        Object.entries(meals).forEach(meal => {
            console.log('MEAL', meal);

            let recipe = this.getRecipe(meal[0], recipes);

            console.log('RECIPE', recipe);

            recipe.ingredients.forEach(ingredient => {
                console.log('ING', ingredient);

                // TODO: rather than name, add id to ingredient creation and use here
                if (ingredient in ingredients) {
                    ingredients[ingredient['item']] += meal[1];
                } 
                else {
                    ingredients[ingredient['item']] = meal[1];
                }
            });
        });

        if (DEBUG) console.log('INGREDIENTS PER YEAR', ingredients);

        return ingredients;
    }

    // get recipe id
    getRecipe(id, recipes) {
        if (DEBUG) console.log('get recipe');

        let match;

        recipes.forEach(recipe => {
            console.log('RECIPE', recipe);
            if (id == recipe.id) {
                match = recipe;
            }
        });

        return match;
    }

    // fill dashboard with content from recipes
    getNumRecipes() {
        if (DEBUG) console.log('get recipes');

        const recipes = this.model.readFromLocalStorage('recipes');
        this.view.showNumberOfRecipes(recipes.length);
    }

    // fill dashboard with content from mealplans
    getNumMealplans() {
        if (DEBUG) console.log('get mealplans');

        const mealplans = this.model.readFromLocalStorage('mealplans');
        this.view.showNumberOfMealplans(mealplans.length);
    }    
 
} // END CLASS