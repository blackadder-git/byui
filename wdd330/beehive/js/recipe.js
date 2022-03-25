/****************************************
 * RECIPE CONTROLLER
*****************************************/
const DEBUG = true;

import Model from './model.js';
import View from './view.js';

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
        this.newIngredientListener();
    }

    // default greeting
    hello (message = "matey") {
        alert("Hello " + message);
    }

    addRecipeListener() {
        document.querySelector('#addRecipe').addEventListener('click', (e) => {
            if (DEBUG) console.log('add recipe listener');
            this.addRecipe();
            this.evaluateNutrition();
        });
    }

    newIngredientListener() {
        document.querySelector('#newIngredient').addEventListener('click', (e) => {
            if (DEBUG) console.log('new ingredient listener');
            this.newIngredient();
        });
    }
    
    delIngredientListener() {
        let ingredients = document.querySelectorAll('.delIngredient');
        ingredients.forEach((ingredient) => {
            ingredient.addEventListener('click', this.delIngredient); // call delete method
        });
    }

    // https://fdc.nal.usda.gov/api-guide.html

    newIngredient() {
        if (DEBUG) console.log('new ingredient');

        let ingredients = document.querySelector('#ingredients');
        const id = Date.now();
        console.log(ingredients);
        const li = document.createElement('li');
        li.setAttribute('id', id);
        li.innerHTML = `<fieldset>
                        <legend>Ingredient</legend>
                        <span class="quantity">
                            <label for="amount${id}">Amount:</label>
                            <input id="amount${id}" name="amount${id}" type="number" min="0" required>
                            <label for="measure${id}">Measure:</label>
                            <input id="measure${id}" list="measures${id}" name="measure${id}" />
                            <datalist id="measures${id}"></datalist>
                        </span>
                        <label for="item${id}">Item:</label>
                        <input id="item${id}" data-id="${id}" class="food" type="text" required>
                        <input type="button" data-id="${id}" class="delIngredient" value="🗑️ Delete">
                        </fieldset>`;
        ingredients.appendChild(li);
        this.delIngredientListener(); // wire up new ingredient for deletion

        this.view.buildMeasureList(`#measures${id}`);

        // this.delIngredientListener();
    }

    addRecipe() {
        if (DEBUG) console.log('add recipe');

        const formId = '#recipe';
        const form = this.view.getFormElements(formId);
        // console.log('DEBUG:', form);
  
        let newRecipe = {};
        newRecipe.ingredients = []; // create empty array for ingredients

        // convert collection to an array
        // https://bobbyhadz.com/blog/javascript-loop-through-form-elements
        Array.from(form).forEach(item => {
            if (item.id == 'name') {
                newRecipe.name = item.value;
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

                ingredient.item = item.value;
                const id = item.getAttribute('data-id');

                const amount = document.querySelector(`#amount${id}`) || 0; // set default
                ingredient.amount = amount.value;

                const measure = document.querySelector(`#measure${id}`) || ''; // set default
                ingredient.measure = measure.value;

                newRecipe.ingredients.push(ingredient);
            }
        });

        console.log(newRecipe);

        let recipes = this.model.readFromLocalStorage('recipes');
        recipes.push(newRecipe);
        this.model.writeToLocalStorage(recipes, 'recipes');

        this.view.clearForm(formId);

        this.view.showMessage('Recipe added');
    }

    delIngredient(e) {
        console.log(`delete parent of data-id = ${e.currentTarget.getAttribute('data-id')}`);
        e.currentTarget.parentElement.remove();
    }


    // the purpose of async/await is to simplify the syntax necessary to consume promise-based APIs
    async lookupFoodData() {
        let url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=peanut%20butter';
        try {
            // make the request
            let response = await fetch(url);

            // return the response as json
            return await response.json();
        } 
        catch (error) {
            console.log(error);
        }
    }

    async getFoodData(food) {
        // request food data
        let info = await this.lookupFoodData();

        console.log(info);        
alert(food);
        // loop each item
        info['foods'].forEach(foodInfo => {
            console.log(foodInfo);

        });
    
        //let container = document.querySelector('.container');
        //container.innerHTML = html;
    }

    evaluateNutrition() {

        const recipe = this.view.getFormElements('#recipe');
        console.log(recipe);





    }



} // END CLASS

const recipe = new Recipe(new Model(), new View());