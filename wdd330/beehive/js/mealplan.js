/********************************************
* Mealplan Controller 
* https://stackabuse.com/drag-and-drop-in-vanilla-javascript/
*******************************************/
const DEBUG = true;

import Model from './model.js';
import View from './view.js';
 
export class Mealplan {
 
     /****************************************
     // constructor
     *****************************************/
     constructor (model, view) {
        this.model = model;
        this.view = view;
 
         // add listeners
        this.addMealplanListener();
        this.cancelListener();

        // interface
        this.setRecommendedCalories();
        this.getRecipes();

     }

     // listen for cancel button click
     cancelListener() {
        if (DEBUG) console.log('cancel mealplan listener');
        
        document.querySelector('#cancel').addEventListener('click', (e) => {
            // redirect to main page
            window.location.replace("../index.html");
        });
    }

    // listen for add meal plan button click
    addMealplanListener() {
        if (DEBUG) console.log('add mealplan listener');
        
        document.querySelector('#addPlan').addEventListener('click', (e) => {
            this.addMealPlan();
        });
    }

    // create meal plan object
    addMealPlan() {
        
        let newWeek = {};
        newWeek.id = Date.now();
        
        // global days array m-su
        days.forEach(day => {
            console.log(day);

            // get child nodes for day
            let recipes = document.querySelector(`#${day}`).childNodes;
            let temp = [];

            recipes.forEach(recipe => {
                console.log(recipe);
                recipe.classList.remove('item');
                temp.push(recipe.outerHTML);
            });
            newWeek[day] = temp;
        });


        // new week object
        if (DEBUG) console.log('WEEK', newWeek);
            
        let mealplans = this.model.readFromLocalStorage('mealplans');
        mealplans.push(newWeek);
        this.model.writeToLocalStorage(mealplans, 'mealplans');

        this.view.showMessage(`A new week was added to your meal plan`);

        // check pantry for needed items
        this.updateShoppingList();

        // reset week
        this.resetWeek();
    }

    // clear out current week
    resetWeek() {
        days.forEach(day => {
            document.querySelector(`#${day}`).innerHTML = "";
            document.querySelector(`#${day}Cal`).innerHTML = "";
        });
    }

    getRecipes() {
        const recipes = this.model.readFromLocalStorage('recipes');
        this.view.buildRecipeList(recipes);
    }

    getRecommended() {
        const family = this.model.readFromLocalStorage('family');
        return this.model.getCalories(family);
    }

    setRecommendedCalories() {
        this.view.setRecommendedCalories(this.getRecommended());
    }

    // calculate calories
    calculateCalories(day, recommended) {
        let calories = 0;
        const children = document.querySelector(`#${day}`).childNodes;
        children.forEach(child => {
            console.log(child.getAttribute('data-calories'));
            calories += Number(child.getAttribute('data-calories'));
        });

        const total = recommended - calories;
        console.log('DAY', day);
        document.querySelector(`#${day}Cal`).textContent = total;
    }

    // update shopping list
    updateShoppingList() {

        // get meal plans
        const mealplans = this.model.readFromLocalStorage('mealplan');

        mealplans.forEach(meals => {
            

        });

        // make list of needed items x quantity

        // check pantry 

        // show difference

    }

} // END CLASS

const mealplan = new Mealplan(new Model(), new View());


// DRAG AND DROP FUNCTIONS ... I put these in the class originally but ran into problems
// resolving dragItem in dragDrop() 
let dragItem = null;
let dragFrom = null;
const days = ['m', 't', 'w', 'th', 'f', 'sa', 'su'];

// https://stackabuse.com/drag-and-drop-in-vanilla-javascript/
// make days droppable 
function makeDroppable() {
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        day.addEventListener('dragover', dragOver);
        day.addEventListener('dragenter', dragEnter);
        day.addEventListener('dragleave', dragLeave);
        day.addEventListener('drop', dragDrop);
    });
}

// make recipes draggable
function makeDraggable() {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('dragend', dragEnd)
    });
}

function dragStart() {
    // console.log('drag started', this);
    dragItem = this;

    // console.log(this.parentNode);
    dragFrom = this.parentNode.getAttribute('id');
    setTimeout(() => this.className = 'invisible', 0);
}

function dragEnd() {
    // console.log('drag ended', this);
    this.className = 'item';
    dragItem = null;
}

const recipes = document.querySelectorAll('.recipes');
recipes.forEach(recipe => {
    recipe.addEventListener('dragover', dragOver);
    recipe.addEventListener('dragenter', dragEnter);
    recipe.addEventListener('dragleave', dragLeave);
    recipe.addEventListener('drop', dragDrop);
});

function dragOver(e) {
    e.preventDefault();
    // console.log('drag over', this);
}
function dragEnter() {
    // console.log('drag entered', this);
}
function dragLeave() {
    // console.log('drag left', this);
}
function dragDrop() {
    // console.log('drag dropped', this);
    this.append(dragItem);

    // recreate the recipe list
    mealplan.getRecipes();
    makeDraggable(); // repeat making the items draggable

    // current drop
    mealplan.calculateCalories(this.getAttribute('id'), mealplan.getRecommended());

    // previous drop using global days array m-su
    if (days.includes(dragFrom)) {
        mealplan.calculateCalories(dragFrom, mealplan.getRecommended());
        dragFrom = '';
    }
}

makeDroppable();

makeDraggable();