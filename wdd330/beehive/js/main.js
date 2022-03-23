/********************************************
 * Main controller
 *******************************************/

import Model from './model.js';
import View from './view.js';
import Controller from './controller.js'; // imports can only be used at the top of a module

const model = new Model();
const view = new View();

const controller = new Controller(model, view);
//controller.hello();


// main controller
/*
import Recipe from './recipe.js';
import Family from './family.js';
import Pantry from './pantry.js';
import View from './view.js';

// create object instances
const recipe = new Recipe();
const family = new Family();
const pantry = new Pantry();
const view = new View();
*/

/*
document.querySelector("#addFamily").addEventListener('click', () => {
    window.location.assign("views/family.html")
});

// show family
const familyMembers = family.getFamilyMembers();
//view.showFamilyMembers(familyMembers, '#familyMembers');
const calories = family.getEstimatedDailyCalorieNeeds(familyMembers);
view.showFamilyCalories(calories, familyMembers.length, '#familyMembers');

// delete family
const delFamilyMembers = document.querySelectorAll(".delFamily");
delFamilyMembers.forEach(element => {
    element.addEventListener('click', (e) => {
        alert(e.currentTarget.getAttribute('id'));
    });
});


// https://www.youtube.com/watch?v=-mgdxq8_a94
*/