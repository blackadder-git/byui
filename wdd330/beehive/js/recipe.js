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
        li.innerHTML = `<fieldset>
                        <legend>Ingredient</legend>
                        <span class="quantity">
                            <label for="amount${id}">Amount:</label>
                            <input id="amount${id}" name="amount${id}" type="number" min="0" required>
                            <label for="measure${id}">Measure:</label>
                            <input list="measures${id}" id="measure${id}" name="measure${id}" />
                            <datalist id="measures${id}"></datalist>
                        </span>
                        <label for="item${id}">Item:</label>
                        <input id="item${id}" type="text" required>
                        <input type="button" data-id=${id} class="delIngredient" value="🗑️ Delete">
                        </fieldset>`;
        ingredients.appendChild(li);
        this.delIngredientListener(); // wire up new ingredient for deletion

        this.view.buildMeasureList(`#measures${id}`);

        // this.delIngredientListener();
    }

    addRecipe() {
        if (DEBUG) console.log('add recipe');

        const id = '#recipe';

        const recipe = this.view.getFormElements(id);
        console.log(recipe);

        // TODO validate inputs

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

const recipe = new Recipe(new Model(), new View());