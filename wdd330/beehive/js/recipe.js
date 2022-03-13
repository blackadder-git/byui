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
    constructor() {
        this.model = new Model();
        this.view = new View();

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

    newIngredient() {
        if (DEBUG) console.log('new ingredient');

        let ingredients = document.querySelector('#ingredients');
        const id = Date.now();
        console.log(ingredients);
        const li = document.createElement('li');
        li.setAttribute('id', id);
        li.innerHTML = `<label for="serves${id}">Serves: <input id="serves${id}" name="serves${id}" type="number" required></label>
                        <label for="measure${id}">Measure: <input id="measure${id}" name="measure${id}" type="text" required></label>
                        <input id="ingredient${id}" type="text">
                        <span data-id=${id} class="delIngredient">X</span>`;
        ingredients.appendChild(li);
        this.delIngredientListener(); // wire up new ingredient for deletion

        // this.delIngredientListener();
    }

    addRecipe() {
        if (DEBUG) console.log('add recipe');

        const id = '#recipe';

        const recipe = this.view.getFormElements(id);
        console.log(recipe);

/*
        if (familyMember != null && familyMember.name.value != '') {
            const newMember = {id: Date.now(), name: familyMember.name.value, age: familyMember.age.value, sex: familyMember.sex.value, activity: familyMember.activity.value};
            console.log(newMember);
            
            let family = this.model.readFromLocalStorage('family');
            family.push(newMember);
            this.model.writeToLocalStorage(family, 'family');

            this.view.clearForm(id);
        }
        else {
            // TODO: let user know there was a problem
            console.log('could not add family member, the form is missing content');
        }
*/
    }

    delIngredient(e) {
        console.log(`delete parent of data-id = ${e.currentTarget.getAttribute('data-id')}`);
        e.currentTarget.parentElement.remove();
    }


} // END CLASS

const recipe = new Recipe();