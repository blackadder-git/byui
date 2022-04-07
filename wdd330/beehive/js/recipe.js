/****************************************
 * RECIPE CONTROLLER
*****************************************/
const DEBUG = true;

import Model from './model.js';
import View from './view.js';
import Nutritionix from './nutritionix.js';

export default class Recipe {

    /****************************************
    // constructor
    *****************************************/
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.buildMeasureList('#measures');

        // add listeners
        this.addRecipeListener();
        this.editRecipeListener();        
        this.addIngredientListener();
        this.cancelListener();
    }

    // default greeting
    hello (message = "matey") {
        alert("Hello " + message);
    }

    addRecipeListener() {
        if (DEBUG) console.log('add recipe listener');

        document.querySelector('#addRecipe').addEventListener('click', (e) => {
            if (document.querySelector('#id').value != '') {

                // delete item from pantry
                this.delRecipe(document.querySelector('#id').value);
            }

            this.addRecipe();
        });
    }

    // https://www.sitepoint.com/get-url-parameters-with-javascript/
    editRecipeListener() {
        if (DEBUG) console.log('edit recipe listener');
        // check the query string for edit?
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        if (id != undefined) {
            this.editRecipe(id);
        }
    }

    addIngredientListener() {
        document.querySelector('#newIngredient').addEventListener('click', (e) => {
            if (DEBUG) console.log('new ingredient listener');
            this.addIngredient();
        });
    }
    
    delIngredientListener() {
        let ingredients = document.querySelectorAll('.delIngredient');
        ingredients.forEach((ingredient) => {
            ingredient.addEventListener('click', this.delIngredient); // call delete method
        });
    }

    cancelListener() {
        if (DEBUG) console.log('cancel pantry item listener');
        
        document.querySelector('#cancel').addEventListener('click', (e) => {
            // redirect to main page
            window.location.replace("../index.html");
        });
    }

    addIngredient() {
        if (DEBUG) console.log('new ingredient');

        this.view.addIngredient();
        this.delIngredientListener(); // wire up new ingredient for deletion
    }

    async addRecipe() {
        if (DEBUG) console.log('add recipe');

        const formId = '#recipe';
        const form = this.view.getFormElements(formId);
        
        if (form != null && form.dish.value != '') {

            let createRecipe = true;

            let newRecipe = {};

            newRecipe.ingredients = []; // create empty array for ingredients

            newRecipe.id = Date.now();

            let calories = 0;

            // convert collection to an array
            // https://bobbyhadz.com/blog/javascript-loop-through-form-elements
            Array.from(form).forEach(async item => {
                if (item.id == 'dish') {
                    newRecipe.dish = item.value;
                }
                else if (item.id == 'instructions') {
                    newRecipe.instructions = item.value;
                }
                else if (item.id == 'type') {
                    newRecipe.type = item.value;
                }
                else if (item.id == 'serves') {
                    newRecipe.serves = item.value;
                }

                if (item.classList.contains('food')) {
                    console.log(item.value);

                    // create ingredient object
                    let ingredient = {};

                    const id = item.getAttribute('data-id');

                    const amount = document.querySelector(`#amount${id}`) || 0; // set default
                    ingredient.amount = amount.value;

                    const measure = document.querySelector(`#measure${id}`) || ''; // set default
                    ingredient.measure = measure.value;

                    ingredient.item = item.value;

                    // create nutrition object
                    const nutrition = new Nutritionix(this.model, this.view);
        
                    // get calorie and image
                    try {
                        // get calories
                        let cal = await nutrition.getNutrientInfoRecipe(ingredient);

                        // set calories for ingredient
                        ingredient.calories = cal;

                        // add to total calaries
                        calories += Number(cal);

                        // add item to ingredient array
                        newRecipe.ingredients.push(ingredient);
                    }
                    catch (err) {
                        createRecipe = false;
                        console.log('bad ingredient ', item.value, err);
                    }
                }
            });

            if (createRecipe == true) {
                // new recipe object
                console.log(newRecipe);

                // wrap this in a time out ... give the promise a chance to return and update the instruction below
                setTimeout(() => {
                    let calories = 0;
                    console.log('recipe id', newRecipe.id);
                    console.log('INGREDIENTS', newRecipe.ingredients);
                    const ing = Object.entries(newRecipe.ingredients);
                    console.log(typeof(ing[0]));

                    for (let i = 0; i< ing.length; i++) {
                        Object.entries(ing[i][1]).forEach(entry => {
                            const [key, value] = entry;
                            if (key == 'calories') {
                                console.log('KEY/VALUE', key, value);
                                calories += value;
                            }
                        });
                    }

                    console.log('CALORIES', calories);

                    newRecipe.calories = calories; // THIS WORKS

                    let recipes = this.model.readFromLocalStorage('recipes');

                    recipes.push(newRecipe);

                    this.model.writeToLocalStorage(recipes, 'recipes');
                }, 4000);                    


                this.view.showMessage(`Now in your cookbook: ${newRecipe.dish}`);

                this.view.clearForm(formId);

                //const objectArray = Object.entries(newRecipe.ingredients);
            }
            else {
                console.log('Error: Could not add recipe, bad ingredient');
            }
        }
        else {
            // TODO: let user know there was a problem
            console.log('Error: Could not add recipe, the form is missing content');
        }

    }

    // use id to look for existing recipe, if found send to view
    editRecipe(id) {
        if (DEBUG) console.log('edit recipe');

        const recipes = this.model.readFromLocalStorage('recipes');
        recipes.forEach(recipe => {
            if (recipe.id == id) {
                this.view.editRecipe(recipe);
                this.delIngredientListener(); // wire up new ingredient for deletion
            }
        });

        this.addIngredientListener();
    }

    // delete recipe if found, update list
    delRecipe(id) {
        if (DEBUG) console.log('delete recipe');

        const recipes = this.model.readFromLocalStorage('recipes');

        // loop each item
        recipes.forEach(function(recipe, index, object) {
            // if recipe is found, delete
            if (recipe.id == id) {
                object.splice(index, 1);
                //console.log(object);
                //console.log('______________________________________________ delete me');
            }
        });

        // save updated list to disk
        this.model.writeToLocalStorage(recipe, 'recipes');
    }

    delIngredient(e) {
        if (DEBUG) console.log('delete ingredient');
        if (DEBUG) console.log(`delete parent of data-id = ${e.currentTarget.getAttribute('data-id')}`);

        e.currentTarget.parentElement.remove();
    }

} // END CLASS

const recipe = new Recipe(new Model(), new View());