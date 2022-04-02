/********************************************
 * View
 *******************************************/
const DEBUG = true;

/****************************************
 * VIEW CLASS
*****************************************/
export default class View {
 
    /****************************************
     * constructor
     *****************************************/
    constructor() {
    }
 
    hello () {
        alert('Aye matey ...');
    }

    /****************************************
     * generic way to get all elememts from a form
     *****************************************/
    getFormElements(id) {
        if (document.querySelector(id)) {
            return document.querySelector(id).elements;
        }
        else {
            console.log(`${id} does not exist`);
            return null;
        }
    }

    clearForm(id) {
        document.querySelector(id).reset();
        //let elements = document.querySelector(id).elements;
        //console.log(elements);
        // from converts elements to an array
        /*
        Array.from(elements).forEach((element) => {
            if (element.type == 'text' || element.type == 'textarea' || element.type == 'number') {
                document.querySelector(`#${element.id}`).value = '';
            }
            else if (element.type == 'select-one' || element.type == 'select-multiple') {
                document.querySelector(`#${element.id}`).selectedIndex = 0;
            }
            else {
                alert(`#${element.id} = ${element.type}`);
            }
        });
        */
    }

    showMessage(message) {
        document.querySelector('#message').innerHTML = message;
    }

    // FAMILY
    showNumberInHousehold(number, calories) {
        document.querySelector('#numHousehold').innerHTML = `<span class="open openModal" data-id="family">${number} members</span>`;
        document.querySelector('#numCalories').innerHTML = calories;
    }

    buildFamilyTable(family) {
        let table = document.createElement('table');
        table.setAttribute('id', 'tableData');
 
        // table header
        let thead = document.createElement('thead');
        table.appendChild(thead);
        let row_1 = document.createElement('tr');

        let heading_1 = document.createElement('th');
        heading_1.textContent = "Name";
        heading_1.setAttribute('scope', 'col');
        
        let heading_2 = document.createElement('th');
        heading_2.textContent = "Age";
        heading_2.setAttribute('scope', 'col');
        
        let heading_3 = document.createElement('th');
        heading_3.textContent = "Sex";
        heading_3.setAttribute('scope', 'col');        
        
        let heading_4 = document.createElement('th');
        heading_4.textContent = "Activity";
        heading_4.setAttribute('scope', 'col');

        let heading_5 = document.createElement('th');
        heading_5.textContent = "Recommended";
        heading_5.setAttribute('scope', 'col');

        // add column headers to fist row
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        row_1.appendChild(heading_5);

        // add row header to table
        thead.appendChild(row_1);

        // table body
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        family.forEach(member => {
            let row = document.createElement('tr');

            let row_data_1 = document.createElement('td');
            row_data_1.innerHTML = `<a href="views/family.html?id=${member.id}" id="${member.id}" class="editFamily">${member.name}</a>`;
            row_data_1.setAttribute('data-label', 'Name');

            let row_data_2 = document.createElement('td');
            row_data_2.textContent = member.age;
            row_data_2.setAttribute('data-label', 'Age');

            let row_data_3 = document.createElement('td');
            row_data_3.textContent = member.sex;
            row_data_3.setAttribute('data-label', 'Sex');

            let row_data_4 = document.createElement('td');
            row_data_4.textContent = member.activity;
            row_data_4.setAttribute('data-label', 'Activity');

            let row_data_5 = document.createElement('td');
            row_data_5.textContent = member.calories;
            row_data_5.setAttribute('data-label', 'Calories');
            
            // add cells to row
            row.appendChild(row_data_1);
            row.appendChild(row_data_2);
            row.appendChild(row_data_3);
            row.appendChild(row_data_4);
            row.appendChild(row_data_5);

            // add row to table
            tbody.appendChild(row);

            console.log(`adding ${member.name} to table`);
        });

        // add to view
        document.querySelector('.modal-content').textContent = '';
        document.querySelector('.modal-content').appendChild(table);
    }

    editFamilyMember(member) {
        document.querySelector('#id').value = member.id;
        document.querySelector('#name').value = member.name;
        document.querySelector('#age').value = member.age;
        if (member.sex == 'male') {
            document.querySelector('#male').checked = true;
        }
        else {
            document.querySelector('#female').checked = true;
        }
        document.querySelector('#activity').value = member.activity;
        document.querySelector('#addFamilyMember').value = 'Update Household Member';
    }

    // PANTRY
    showNumberInPantry(number) {
        document.querySelector('#numPantryItems').innerHTML = `<span class="open openModal" data-id="pantry">${number} items</span>`;
    }

    buildPantryList(items) {
        let table = document.createElement('table');
        table.setAttribute('id', 'tableData');
        table.setAttribute('class', 'tablePantry');
 
        // build table header
        let thead = document.createElement('thead');
        table.appendChild(thead);
        let row_1 = document.createElement('tr');

        let heading_1 = document.createElement('th');
        heading_1.textContent = "Image";
        heading_1.setAttribute('scope', 'col');

        let heading_2 = document.createElement('th');
        heading_2.textContent = "Item";
        heading_2.setAttribute('scope', 'col');

        let heading_3 = document.createElement('th');
        heading_3.textContent = "Quantity";
        heading_3.setAttribute('scope', 'col');

        let heading_4 = document.createElement('th');
        heading_4.textContent = "Amount";
        heading_4.setAttribute('scope', 'col');

        let heading_5 = document.createElement('th');
        heading_5.textContent = "Measure";
        heading_5.setAttribute('scope', 'col');

        let heading_6 = document.createElement('th');
        heading_6.textContent = "Type";
        heading_6.setAttribute('scope', 'col');

        // add column headers to first row
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        row_1.appendChild(heading_5);
        row_1.appendChild(heading_6);

        // add row header to table
        thead.appendChild(row_1);

        // table body
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        items.forEach(item => {
            let row = document.createElement('tr');
            
            let row_data_1 = document.createElement('td');
            //row_data_1.setAttribute('data-label', 'image');
            row_data_1.innerHTML = `<img src="${item.image}" alt="image of ${item.food}">`;
                        
            let row_data_2 = document.createElement('td');
            row_data_2.setAttribute('data-label', 'Food');
            row_data_2.innerHTML = `<a href="views/pantry.html?id=${item.id}" id="${item.id}" class="editRecipe">${item.food}</a>`;
            
            let row_data_3 = document.createElement('td');
            row_data_3.setAttribute('data-label', 'Quantity');
            row_data_3.textContent = item.quantity;
            
            let row_data_4 = document.createElement('td');
            row_data_4.setAttribute('data-label', 'Amount');
            row_data_4.textContent = item.amount;
            
            let row_data_5 = document.createElement('td');
            row_data_5.setAttribute('data-label', 'Measure');
            row_data_5.textContent = item.measure;
            
            let row_data_6 = document.createElement('td');
            row_data_6.setAttribute('data-label', 'Type');
            row_data_6.textContent = item.type;
            
            // add cells to row
            row.appendChild(row_data_1);
            row.appendChild(row_data_2);
            row.appendChild(row_data_3);
            row.appendChild(row_data_4);
            row.appendChild(row_data_5);
            row.appendChild(row_data_6);

            // add row to table
            tbody.appendChild(row);

            console.log(`adding ${item.food} to table`);
        });

        // add to view
        document.querySelector('.modal-content').textContent = '';
        document.querySelector('.modal-content').appendChild(table);

    }

    editPantryItem(item) {
        document.querySelector('#id').value = item.id;
        document.querySelector('#food').value = item.food;
        document.querySelector('#quantity').value = item.quantity;
        document.querySelector('#type').value = item.type;
        document.querySelector('#amount').value = item.amount;
        document.querySelector('#measure').value = item.measure;
        document.querySelector('#addPantryItem').value = 'Update Pantry Item';
    }


    // RECIPE
    showNumberOfRecipes(number) {
        document.querySelector('#numRecipes').innerHTML = `<span class="open openModal" data-id="recipes">${number} recipes</span>`;
    }

    addIngredient() {
        if (DEBUG) console.log('new ingredient');

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
        
        this.buildMeasureList(`#measures${id}`);

        // return id (used to edit recipe)
        return id;
    }


    buildRecipeList(recipes) {
        let table = document.createElement('table');
        table.setAttribute('id', 'tableData');
 
        // build table header
        let thead = document.createElement('thead');
        table.appendChild(thead);
        let row_1 = document.createElement('tr');

        let heading_1 = document.createElement('th');
        heading_1.textContent = "Recipe";
        heading_1.setAttribute('scope', 'col');

        let heading_2 = document.createElement('th');
        heading_2.textContent = "Serves";
        heading_2.setAttribute('scope', 'col');

        let heading_3 = document.createElement('th');
        heading_3.textContent = "Calories";
        heading_3.setAttribute('scope', 'col');

        let heading_4 = document.createElement('th');
        heading_4.textContent = "Type";
        heading_4.setAttribute('scope', 'col');

        // add column headers to first row
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);

        // add row header to table
        thead.appendChild(row_1);

        // table body
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        recipes.forEach(recipe => {
            let row = document.createElement('tr');

            let row_data_1 = document.createElement('td');
            row_data_1.innerHTML = `<a href="views/recipe.html?id=${recipe.id}" id="${recipe.id}" class="editRecipe">${recipe.dish}</a>`;
            row_data_1.setAttribute('data-label', 'Recipe');

            let row_data_2 = document.createElement('td');
            row_data_2.textContent = recipe.serves;
            row_data_2.setAttribute('data-label', 'Serves');

            let row_data_3 = document.createElement('td');
            row_data_3.textContent = recipe.calories;
            row_data_3.setAttribute('data-label', 'Calories');

            let row_data_4 = document.createElement('td');
            row_data_4.textContent = recipe.type;
            row_data_4.setAttribute('data-label', 'Type');

            // add cells to row
            row.appendChild(row_data_1);
            row.appendChild(row_data_2);
            row.appendChild(row_data_3);
            row.appendChild(row_data_4);

            // add row to table
            tbody.appendChild(row);

            console.log(`adding ${recipe.dish} to table`);
        });

        // add to view
        document.querySelector('.modal-content').textContent = '';
        document.querySelector('.modal-content').appendChild(table);
    }

    // https://www.thecookierookie.com/cooking-measurements-kitchen-conversion-chart/
    buildMeasureList(id) {
        const us = ['tsp', 'tbsp', 'fl ounce', 'pint', 'quart', 'gallon', 'oz', 'pound'];
        //const metric = ['ml', 'liter', 'gram'];
        let dl = document.querySelector(id);
        us.forEach((measure) => {
            let option = document.createElement('option');
            option.value = measure;
            dl.appendChild(option);
            console.log(measure);
        }); 
    }

    editRecipe(recipe) {
        document.querySelector('#id').value = recipe.id;
        document.querySelector('#dish').value = recipe.dish;
        document.querySelector('#instructions').value = recipe.instructions;
        document.querySelector('#type').value = recipe.type;
        document.querySelector('#serves').value = recipe.serves;

        // add first ingredient
        document.querySelector('#item1').value = recipe.ingredients[0].item;
        document.querySelector('#amount1').value = recipe.ingredients[0].amount;
        document.querySelector('#measure1').value = recipe.ingredients[0].measure;

        // loop all other ingredients
        recipe.ingredients.slice(1).forEach(item => {
            console.log(item);
            let id = this.addIngredient();
            console.log(id);

            document.querySelector(`#item${id}`).value = item.item;
            document.querySelector(`#amount${id}`).value = item.amount;
            document.querySelector(`#measure${id}`).value = item.measure;
        });

        document.querySelector('#addRecipe').value = 'Update Recipe';
    }

 }
 // end class







/*

import Family from './family.js';

const DEBUG = true;

/****************************************
 * VIEW CLASS
*****************************************
/
export default class View {

    /****************************************
    // 
    *****************************************
    /
    showFamilyMembers(family, id) {
        let parent = document.querySelector(id);

        family.forEach(element => {
            let div = document.createElement('div');
            div.innerHTML = `${element.name} ${element.age} <span id="${element.id}" class="delFamily">X</span>`;
            parent.appendChild(div);
        });
    }

    showFamilyCalories(calories, familyMembers, id) {
        let parent = document.querySelector(id);

        parent.innerHTML = `Your ${familyMembers} family members need a total of ${calories} calories per day according to WHO `;
    }    

} // END CLASS

const family = new Family();

if (document.querySelector("#addFamilyMember")) {
    document.querySelector("#addFamilyMember").addEventListener('click', (e) => {
        //alert("Add family member");
        //family.hello();
        const name = document.querySelector('#name').value;
        const age = document.querySelector('#age').value;
        const sex = document.querySelector('#sex').value;
        const activity = document.querySelector('#activity').value;
        if (name) {
            family.addFamilyMember(name, age, sex, activity);
        }
        else {
            alert('no name');
        }
    });
}
else {
    //alert('not here');
}
*/