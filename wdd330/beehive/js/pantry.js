/****************************************
 * PANTRY CONTROLLER
*****************************************/

const DEBUG = true;

import Conversions from './conversion.js';
import Model from './model.js';
import View from './view.js';

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
        this.addFoodDataListener();        
    }

    // default greeting
    hello (message = "matey") {
        alert("Hello " + message);
    }

    addPantryItemListener() {
        document.querySelector('#addPantryItem').addEventListener('click', (e) => {
            if (DEBUG) console.log('add pantry item listener');
            this.addPantryItem();
        });
    }

    // https://fdc.nal.usda.gov/api-guide.html
    addFoodDataListener() {
        document.querySelector('#lookupFoodData').addEventListener('click', (e) => {
            if (DEBUG) console.log('lookup food item');

            const food = document.querySelector('#food').value;
            if (food != '') {
                this.getFoodData(food);
            }
            else {
                console.log('Food is missing');
            }
        });
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
alert(food);
        // loop each item
        info.forEach(foodInfo => {
            console.log(foodInfo);

        });
    
        //let container = document.querySelector('.container');
        //container.innerHTML = html;
    }

    addPantryItem() {
        if (DEBUG) console.log('add pantry item');
/*
        const id = '#familyMember';

        const familyMember = this.view.getFormElements(id);

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

} // END CLASS

const pantry = new Pantry(new Model(), new View());