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
        if (DEBUG) console.log('build household table');

        let modal = document.querySelector('.modal-content');
        modal.textContent = '';

        if (family.length == 0) {
            document.querySelector('.modal-header h2').textContent = 'Your household is empty';
            modal.innerHTML = '<span class="addFamily">Add a member ➕<span>';
        }
        else {    
            document.querySelector('.modal-header h2').textContent = `Your household contains: ${family.length} members`;

            let table = document.createElement('table');
            table.classList.add('tableData');        
            table.setAttribute('class', 'tableHousehold');

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
            modal.appendChild(table);
        }
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

    buildPantryTable(items) {
        if (DEBUG) console.log('build pantry table');

        let modal = document.querySelector('.modal-content');
        modal.textContent = '';

        if (items.length == 0) {
            document.querySelector('.modal-header h2').textContent = 'Your pantry is empty';
            modal.innerHTML = '<span class="addPantry">Add an item ➕<span>';
        }
        else {        
            document.querySelector('.modal-header h2').textContent = `Your pantry contains: ${items.length} items`;

            let table = document.createElement('table');
            table.classList.add('tableData');        
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
                row_data_1.className = 'center';
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
           modal.appendChild(table);
        }
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

    // build modal recipe table
    buildRecipeTable(recipes) {
        if (DEBUG) console.log('build recipe table');

        let modal = document.querySelector('.modal-content');
        modal.textContent = '';

        if (recipes.length == 0) {
            document.querySelector('.modal-header h2').textContent = 'Your cookbook is empty';
            modal.innerHTML = '<span class="addRecipe">Add a recipe ➕<span>';
        }
        else {
            document.querySelector('.modal-header h2').textContent = `Your cookbook contains: ${recipes.length} recipes`;

            if (DEBUG) console.log('build recipe table');

            let table = document.createElement('table');
            table.classList.add('tableData');
            table.setAttribute('class', 'tableRecipe');
    
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
            modal.appendChild(table);
        }
    }

    // build recipe list for meal plan page
    buildRecipeList(recipes) {
        if (DEBUG) console.log('build recipe list');

        let div = document.querySelector('#recipes');

        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }

        recipes.forEach(recipe => {
            console.log(recipe);
            let d = document.createElement('div');
            d.classList.add('item');
            d.setAttribute('draggable', 'true');
            d.setAttribute('data-calories', recipe.calories);
            d.setAttribute('data-recipeId', recipe.id);
            d.setAttribute('title', `${recipe.calories} calories`);
            d.append(recipe.dish);
            div.appendChild(d);
        });
    }

    // https://www.thecookierookie.com/cooking-measurements-kitchen-conversion-chart/
    buildMeasureList(id) {
        if (DEBUG) console.log('build measure list');
        
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

    // modify recipe
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

    // SHOPPING LIST
    showNumberShoppingList(number) {
        document.querySelector('#numShoppingList').innerHTML = `<span class="open openModal" data-id="shopping">${number} items</span>`;
    }

    // build modal meal plan table
    buildShoppingTable(list) {
        if (DEBUG) console.log('build shopping list table');

        // clear current weeks
        let modal = document.querySelector('.modal-content');
        modal.textContent = '';

        if (list.length == 0) {
            document.querySelector('.modal-header h2').textContent = 'Your list is empty';
            //modal.textContent = 'You have enough food in your pantry to match your meal plan';
            modal.textContent = 'TODO: build list here';
        }
        else {
            document.querySelector('.modal-header h2').textContent = `Your shopping list contains: ${list.length} items`;
            modal.textContent = 'TODO: build list here';
        }
    }

    // MEALPLAN
    showNumberOfMealplans(number) {
        document.querySelector('#numMealplans').innerHTML = `<span class="open openModal" data-id="mealplans">${number} meal plans</span>`;
    }

    // set calories on meal plan page
    setRecommendedCalories(calories) {
        document.querySelector('#recCalories').innerHTML = calories;
        const days = ['m','t','w','th','f','sa','su'];

        days.forEach(day => {
            document.querySelector(`#${day}Cal`).innerHTML = calories;
        });
    }

    // build modal meal plan table
    buildMealplanTable(mealplans) {
        if (DEBUG) console.log('build meal plan table');

        // clear current weeks
        let modal = document.querySelector('.modal-content');
        modal.textContent = '';

        if (mealplans.length == 0) {
            document.querySelector('.modal-header h2').textContent = 'Your meal plan is empty';
            modal.innerHTML = '<span class="addMealplan">Add a week ➕<span>';
        }
        else {
            document.querySelector('.modal-header h2').textContent = `Your meal plan contains: ${mealplans.length} weeks`;

            const days = ['m', 't', 'w', 'th', 'f', 'sa', 'su'];
            const daysFull = {m:'Monday', t:'Tuesday', w:'Wednesday', th:'Thursday', f:'Friday', sa:'Saturday', su:'Sunday'};

            // TODO: these variable names are terrible, fix them ...
            console.log('MEALS', mealplans);
            const weeks = Object.entries(mealplans);
            console.log('TEMP', weeks);            

            // number of loops to make
            let count = weeks.length;
            let timesPerYear = Math.floor(52 / weeks.length);
            const evenWeeks = ((52 % weeks.length) == 0) ? 0 : 2 % weeks.length; // number of times to use last week

            weeks.forEach(week => {

                let table = document.createElement('table');
                table.classList.add('tableData');
                table.classList.add('week');
                table.setAttribute('class', 'tableMealplan');            
        
                // build table header
                let thead = document.createElement('thead');
                table.appendChild(thead);
                let tr = document.createElement('tr');
        
                let th_1 = document.createElement('th');
                th_1.textContent = "Monday";
                th_1.setAttribute('scope', 'col');
        
                let th_2 = document.createElement('th');
                th_2.textContent = "Tuesday";
                th_2.setAttribute('scope', 'col');
        
                let th_3 = document.createElement('th');
                th_3.textContent = "Wednesday";
                th_3.setAttribute('scope', 'col');
        
                let th_4 = document.createElement('th');
                th_4.textContent = "Thursday";
                th_4.setAttribute('scope', 'col');
        
                let th_5 = document.createElement('th');
                th_5.textContent = "Friday";
                th_5.setAttribute('scope', 'col');
        
                let th_6 = document.createElement('th');
                th_6.textContent = "Saturday";
                th_6.setAttribute('scope', 'col');
        
                let th_7 = document.createElement('th');
                th_7.textContent = "Sunday";
                th_7.setAttribute('scope', 'col');
        
                // add column headers to first row
                tr.appendChild(th_1);
                tr.appendChild(th_2);
                tr.appendChild(th_3);
                tr.appendChild(th_4);
                tr.appendChild(th_5);
                tr.appendChild(th_6);
                tr.appendChild(th_7);
        
                // add row header to table
                thead.appendChild(tr);
        
                // table body
                let tbody = document.createElement('tbody');
                table.appendChild(tbody);

                console.log('TEMP2', week[1]);

                let row = document.createElement('tr');
                // add content for each day
                days.forEach(day => {
                    let td = document.createElement('td');
                    td.setAttribute('data-label', daysFull[day]);
                    week[1][day].forEach(recipe => {
                        console.log(day, recipe);
                        // add content to cell
                        td.innerHTML += recipe;
                    });

                    // add row to table    
                    row.appendChild(td);
                });

                // add row to table
                tbody.appendChild(row);

                // add to view
                let h2 = document.createElement('h2');

                if (count == 1 && evenWeeks != 0) {
                    // last week
                    h2.textContent = `${timesPerYear + (52 % weeks.length)} x per year`; // odd last week
                }
                else {
                    h2.textContent = `${timesPerYear} x per year`;
                    count--;
                    console.log(count);
                }
                modal.appendChild(h2);
                modal.appendChild(table);            
            });
        }
    }

} // END CLASS