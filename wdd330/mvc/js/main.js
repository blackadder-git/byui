/*
MVC
A user does something. That “something” is passed to a Controller that controls what should happen next. 
Often, the Controller requests data from the Model and then gives it to the View, which presents it to the user. 
But what does this separation mean for a website or web application?

As a general rule, a View shouldn’t run its own methods. For example, a dialog shouldn’t open or close itself. Leave this to the Controller.

If a user clicks on a Save button within a dialog, that event is passed to a Controller action. The action can then decide what the View 
should do. Maybe it closes the dialog. Or maybe it tells the View to display an “in-progress” indicator while the data saves. Once the 
data is saved, the Ajax completion event fires off another controller action, which tells the View to hide the indicator and close the dialog.

However, there are situations in which Views should handle their own events or run their own methods. For example, a View could have an input 
range with a slider that allows the user to pick the value. The View handles the logic for that slider interaction and how it displays the 
resulting value. There’s no need to have a Controller micromanage that interaction.

An event handler is assigned to a controller method that will do the user’s bidding.

https://alistapart.com/article/javascript-mvc/
*/

import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';


const model = new Model();
const view = new View();
const controller = new Controller(model, view);
