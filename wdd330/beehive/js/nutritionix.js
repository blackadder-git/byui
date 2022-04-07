/****************************************
 * NUTRITION API
 * https://www.programmableweb.com/category/nutrition/api
 * 
 * Alternatives
 * https://fdc.nal.usda.gov/api-guide.html
 * https://www.youtube.com/watch?v=-mgdxq8_a94
 * https://www.themealdb.com/api/json/v1/1/search.php?s=Pizza
*****************************************/
const DEBUG = true;

export default class Nutritionix {

    /****************************************
    // constructor
    *****************************************/
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    // Inside an async function you can use the await keyword before a call to a function 
    // that returns a promise. This makes the code wait at that point until the promise is 
    // settled, at which point the fulfilled value of the promise is treated as a return 
    // value, or the rejected value is thrown
    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises#async_and_await
    async getImage(food, newItem) {
        if (DEBUG) console.log('get image');

        try {
            const foods = await this.getNutrientInfoPantry(food);
            //setTimeout(async () => {
                // if (DEBUG) console.log(foods.thumb);
                // TODO: as the function call above always returns a promise, to get the data it may be possible to use .then()
                // https://stackoverflow.com/questions/37533929/how-to-return-data-from-promise

                if (Object.keys(foods).length !== 0) {
                    console.log('image of food=', foods.thumb);

                    console.log('what is this ...', typeof(foods.thumb));

                    newItem.image = foods.thumb; // pull image from response

                    // new pantry item object
                    let pantry = this.model.readFromLocalStorage('pantry');
                    pantry.push(newItem);
                    this.model.writeToLocalStorage(pantry, 'pantry');
                }
                else {
                    console.log('Avast, thar be no food here ...');
                }
            //}, 2000);
        }
        catch (error) {
            console.error(`Could not get image: ${error}`);
            throw new Error(error);
        }
    }

    /*******************************************************
    * TODO: this function works but before I can combine it with the Recipe into, need to understand
    * how to use promises better, specifically to get back data
    * docs: https://trackapi.nutritionix.com/docs/#
    */ 
    async getNutrientInfoPantry(food) {
        if (DEBUG) console.log('get nutrient info for:', food);

        let r2 = {};
        try {
            const search = {
                "query": `"${food}"`
            };

            let url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

            // make the request
            r2 = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'x-app-id': '578fc789',
                    'x-app-key': '4fb00344f366423899af5b4ad4425c93',
                    'x-remote-user-id': '578fc789',                  
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(search) // body data type must match "Content-Type" header
            })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${ response.status }`); // 404 when food is not found
                }
                return await response.json();
            })
            .then(async (response) => {
                // handle response data here
                if (DEBUG) console.log(response);

                // response data from a promise is only accessible here in the .then() 
                // make it easy to get specific information
                response.calories = response.foods[0].nf_calories;
                response.thumb = response.foods[0].photo.thumb;
                return await response;
            });
        }
        catch (error) {
            console.log(error);
        }        
        
        // necessary return
        return r2;
    }


    /*******************************************************
    * TODO: this function works but before I can combine it with the Pantry into, need to understand
    * how to use promises better, specifically to get back data
    * docs: https://trackapi.nutritionix.com/docs/#
    */ 
    async getNutrientInfoRecipe(ingredient) {
        let food = `${ingredient.amount} ${ingredient.measure} ${ingredient.item}`;

        try {
            const search = {
                "query": `"${food}"`
            };

            let url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

            let calories = 0;

            // make the request
            calories = await fetch(url, {
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
                // console.log('ING', response);
                console.log('INGREDIENT CALORIES', Math.floor(response.foods[0].nf_calories));
                //ingredient.calories = Math.floor(response.foods[0].nf_calories);
                //ingredient.thumb = response.foods[0].photo.thumb;
                return Math.floor(response.foods[0].nf_calories);
            })
            .catch(err => {
                throw new Error(err);
            });

            console.log('CALORIES', calories);
            return calories;
        } 
        catch (error) {
            console.log('ERROR: ', error);
            throw new Error(error);
        }
    }

    // THIS WORKS, BUT I AM 100% NOT CONFIDENT THAT IT WILL BREAK SO I AM USING THE TWO NEARLY IDENTICAL FUNCTIONS
    // ABOVE UNTIL I UNDERSTAND PROMISES BETTER
    async getNutrientInfoFrankenstein(ingredient) {
        let food = '';
        let pantry = true;

        if (typeof(ingredient) != 'string') {
            food = `${ingredient.amount} ${ingredient.measure} ${ingredient.item}`;

            // making a recipe
            pantry = false; 
        }
        else {
            food = ingredient;
        }

        if (DEBUG) console.log('get nutrient info for: ', food);

        let r2 = {};
        try {
            const search = {
                "query": `"${food}"`
            };

            let url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

            // make the request
            r2 = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'x-app-id': '578fc789',
                    'x-app-key': '4fb00344f366423899af5b4ad4425c93',
                    'x-remote-user-id': '578fc789',                  
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(search) // body data type must match "Content-Type" header
            })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${ response.status }`); // 404 when food is not found
                }
                return await response.json();
            })
            .then(async (response) => {
                // handle response data here
                if (DEBUG) console.log(response);

                // response data from a promise is only accessible here in the .then() 
                // make it easy to get specific information
                // needed for multiple ingredients
                if (pantry == false) {
                    ingredient.calories = response.foods[0].nf_calories;
                    ingredient.thumb = response.foods[0].photo.thumb;
                    if (DEBUG) console.log(ingredient, '__________recipe');
                }
                else {
                    // needed for single ingredients
                    response.calories = response.foods[0].nf_calories;
                    response.thumb = response.foods[0].photo.thumb;
                    if (DEBUG) console.log(response, '__________pantry');
                    return await response;
                }
            })
            .catch(err => {
                throw new Error(err);
            });            
        }
        catch (error) {
            console.log(error);
        }        
        
        // necessary return for single ingredient
        return r2;
    }

} // END CLASS

