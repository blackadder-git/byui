/****************************************
 * PANTRY CONTROLLER
*****************************************/
const DEBUG = true;

import Model from './model.js';
import View from './view.js';
import Nutritionix from './nutritionix.js';

export default class Pantry {

    /****************************************
    // constructor
    *****************************************/
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.buildMeasureList('#measures');

        // add listeners
        this.addPantryItemListener();
        this.editPantryItemListener();
        this.cancelListener();        
    }

    // default greeting
    hello (message = "matey") {
        alert("Hello " + message);
    }

    addPantryItemListener() {
        if (DEBUG) console.log('add pantry item listener');

        document.querySelector('#addPantryItem').addEventListener('click', (e) => {
            
            if (document.querySelector('#id').value != '') {

                // delete item from pantry
                this.delPantryItem(document.querySelector('#id').value);
            }

            this.addPantryItem();

            // TODO: figure out why item isn´t saved if I redirect afterwards
            // redirect to main page
            // window.location.replace("../index.html");            
        });
    }

    // https://www.sitepoint.com/get-url-parameters-with-javascript/
    editPantryItemListener() {
        if (DEBUG) console.log('edit pantry item listener');

        // check the query string for edit?
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        if (id != undefined) {
            this.editPantryItem(id);
        }
    }

    cancelListener() {
        if (DEBUG) console.log('cancel listener');
        
        document.querySelector('#cancel').addEventListener('click', (e) => {
            // redirect to main page
            window.location.replace("../index.html");
        });
    }

    addPantryItem() {
        if (DEBUG) console.log('add pantry item');

        const id = '#pantryItem';

        const form = this.view.getFormElements(id);

        if (form != null && pantryItem.food.value != '') {
            const newItem = {id: Date.now(), 
                             food: form.food.value, 
                             quantity: form.quantity.value, 
                             type: form.type.value, 
                             amount: form.amount.value,
                             measure: form.measure.value,
                            };

            // create nutrition object
            const nutrition = new Nutritionix(this.model, this.view);

            try {
                // pass value and item to object because I cant figure out a good way to access a promise
                nutrition.getImage(form.food.value, newItem);

                this.view.showMessage(`Now in your pantry: ${form.food.value}`);

                // clear the form
                this.view.clearForm(id);
            }
            catch (error) {
                console.error(`Could not get image: ${error}`);
                // TODO: add error message
            }
        }
        else {
            // TODO: let user know there was a problem
            console.log('could not add pantry item, the form is missing content');
        }
    }

    // use id to look for existing pantry item, if found send to view
    editPantryItem(id) {
        if (DEBUG) console.log('edit pantry item');

        const pantry = this.model.readFromLocalStorage('pantry');
        pantry.forEach(item => {
            if (item.id == id) {
                this.view.editPantryItem(item);
            }
        });
    }

    // delete pantry item if found, update list
    delPantryItem(id) {
        if (DEBUG) console.log('delete pantry item');

        const pantry = this.model.readFromLocalStorage('pantry');

        // loop each item
        pantry.forEach(function(item, index, object) {
            // if item is found, delete
            if (item.id == id) {
                object.splice(index, 1);
            }
        });

        // save updated list to disk
        this.model.writeToLocalStorage(pantry, 'pantry');
    }

} // END CLASS

const pantry = new Pantry(new Model(), new View());