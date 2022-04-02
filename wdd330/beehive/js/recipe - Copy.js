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
        this.editRecipeListener();        
        this.addIngredientListener();
        this.cancelListener();
    }

    // default greeting
    hello (message = "matey") {
        alert("Hello " + message);
    }

    /*
    lookupFoodListener() {
        document.querySelector('#lookupFood').addEventListener('click', (e) => {
            if (DEBUG) console.log('lookup food listener');
            this.lookupFoodData();
        });
    }*/

    addRecipeListener() {
        if (DEBUG) console.log('add recipe listener');

        document.querySelector('#addRecipe').addEventListener('click', (e) => {
            if (document.querySelector('#id').value != '') {

                // delete item from pantry
                this.delRecipe(document.querySelector('#id').value);
            }

            this.addRecipe();
            //this.evaluateNutrition();
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


    // https://fdc.nal.usda.gov/api-guide.html
    // https://www.youtube.com/watch?v=-mgdxq8_a94
    // https://www.themealdb.com/api/json/v1/1/search.php?s=Pizza
    addIngredient() {
        if (DEBUG) console.log('new ingredient');

        /*
        let ingredients = document.querySelector('#ingredients');
        const id = Date.now();
        console.log(ingredients);
        const li = document.createElement('li');
        li.setAttribute('id', id);
        li.setAttribute('data-id', 'extra');
        li.innerHTML = `<fieldset>
                        <legend>Ingredient</legend>
                        <label for="item${id}">Item:</label>
                        <input id="item${id}" data-id="${id}" class="food" type="text" required>
                        <span class="quantity">
                            <label for="amount${id}">Amount:</label>
                            <input id="amount${id}" name="amount${id}" type="number" min="0" required>
                            <label for="measure${id}">Measure:</label>
                            <input id="measure${id}" list="measures${id}" name="measure${id}" />
                            <datalist id="measures${id}"></datalist>
                        </span>
                        <input type="button" data-id="${id}" class="delIngredient" value="🗑️ Delete">
                        </fieldset>`;
        ingredients.appendChild(li);
        */
        this.view.addIngredient();
        this.delIngredientListener(); // wire up new ingredient for deletion

        //this.view.buildMeasureList(`#measures${id}`);

        // return id (used to edit recipe)
        //return id;

        // this.delIngredientListener();
    }

    async addRecipe() {
        if (DEBUG) console.log('add recipe');

        const formId = '#recipe';
        const form = this.view.getFormElements(formId);
        // console.log('DEBUG:', form);
        
        if (form != null && form.dish.value != '') {

            let calories = 0;

            let newRecipe = {};

            newRecipe.ingredients = []; // create empty array for ingredients

            newRecipe.id = Date.now();

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

                    // get calorie and image
                    await this.getNutrientInfo(ingredient);

                    calories += Number(ingredient.calories);

                    newRecipe.ingredients.push(ingredient);

                }
            });

            // new recipe object
            console.log(newRecipe);

            // wrap this in a time out ... give the promise a chance to return and update the instruction below
            setTimeout(() => {
                let calories = 0;
                console.log(newRecipe.id);
                console.log(newRecipe.ingredients);
                const ing = Object.entries(newRecipe.ingredients);
                console.log(typeof(ing[0]));

                for(let i = 0; i< ing.length; i++) {
                    Object.entries(ing[i][1]).forEach(entry => {
                        const [key, value] = entry;
                        if (key == 'calories') {
                            console.log(key, value);
                            calories += value;
                        }
                    });
                }

                console.log(calories);

                newRecipe.calories = calories; // THIS WORKS

                let recipes = this.model.readFromLocalStorage('recipes');

                recipes.push(newRecipe);

                this.model.writeToLocalStorage(recipes, 'recipes');
            }, 2000);                    


            this.view.clearForm(formId);

            this.view.showMessage('Recipe added');

            const objectArray = Object.entries(newRecipe.ingredients);
        }
        else {
            // TODO: let user know there was a problem
            console.log('could not add recipe, the form is missing content');
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


    async getNutrientInfo(ingredient) {
        let food = `${ingredient.amount} ${ingredient.measure} ${ingredient.item}`;

        try {
            const search = {
                "query": `"${food}"`
            };

            let url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

            // make the request
            fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  'x-app-id': '578fc789',
                  'x-app-key': '4fb00344f366423899af5b4ad4425c93',
                  'x-remote-user-id': '0',                  
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(search) // body data type must match "Content-Type" header
            })
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${ response.status }`);
              }
              return await response.json();
            })
            .then(async (response) => {
                // handle response data here
                ingredient.calories = response.foods[0].nf_calories;
                ingredient.thumb = response.foods[0].photo.thumb;
            })
            .catch(err => {
                throw new Error(err);
            });
        } 
        catch (error) {
            console.log('ERROR: ', error);
        }
    }


    delIngredient(e) {
        if (DEBUG) console.log('delete ingredient');
        if (DEBUG) console.log(`delete parent of data-id = ${e.currentTarget.getAttribute('data-id')}`);

        e.currentTarget.parentElement.remove();
    }


    // the purpose of async/await is to simplify the syntax necessary to consume promise-based APIs
    async lookupFoodData() {
        // https://spoonacular.com/food-api/docs#Guess-Nutrition-by-Dish-Name
        // https://www.nutritionix.com/business/api

        // https://fdc.nal.usda.gov/fdc-app.html#/food-details/324860/nutrients
        //let url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=peanut%20butter&dataType=Survey%20(FNDDS)&pageSize=1';
        //let url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=cheddar%20cheese&dataType=Survey%20%28FNDDS%29&pageSize=1';
        
        try {
            const search = {
                "query": "2 pound chocolate 2 gallon milk 9 tsp sugar 2 tbsp flour"
              };

            // make the request
            //let response = await fetch(url);
            let url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  'x-app-id': '578fc789',
                  'x-app-key': '4fb00344f366423899af5b4ad4425c93',
                  'x-remote-user-id': '0',                  
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(search) // body data type must match "Content-Type" header
              });

            let data = response.json();

            console.log(data);

            // return the response as json
            return await data;
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