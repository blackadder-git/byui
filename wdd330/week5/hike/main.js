/*
Before you do this, compare your plans with this partial solution file. It has a class with methods stubbed out. 
How does it differ from your plans? Discuss this with your team. You do not need to implement yours exactly like the example...
but make sure you understand why each of the properties, methods, and functions are there before continuing.

With either your groups ideas or using the partial solution file above, write the rest of the code to make the application work.

I would recommend a structure similar to the following for your application:

  index.html 
  main.js 
  hikes.js 
  styles.css 

You will need a main entry point where you will bring in your modules. 
Create a main.js and add that to your HTML with your script element.

When using modules you need to tell the HTML file that you want to use modules...<script src="main.js" type="module">

You need to import your module before you can use it. import Hikes from './hikes.js'; (This would go in main.js)

If you organized your code using a class that you exported from your module, 
you need to create an instance of that class before you can use it. 
You would do this in main.js: const myHike = new Hikes('hikeListId');

Once you have your instance, you use it to call the showHikeList method. myHike.showHikeList()

*/


import Hikes from './hikes.js';

const myHike = new Hikes('hikeListId');

myHike.showHikeList();

const listItems = document.querySelectorAll('li');


/*
When we touch a hike it would be good if it showed us the full details 
for that hike. Make it so. Replace the list of hikes with a detailed view of one hike.
*/

listItems.forEach(li => {
    li.addEventListener('click', () => {
        let hikeName = li.querySelector('h2').textContent;
        let item = myHike.showOneHike(hikeName);
    });
});