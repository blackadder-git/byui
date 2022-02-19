// Using local storage, display the amount of time in days (rounded to a whole number) between user 
// visits to this Gallery page by the user's agent (browser). You may elect to display this information 
// where you deem fit on the page.

const recentvisit = Date.now();
const lastvisit = localStorage.getItem("lastvisit");
let timesincelastvisit = 0;

// only do if lastvisit is set
if (lastvisit != 'undefined' && lastvisit != null ) {
    timesincelastvisit = Math.floor((recentvisit - lastvisit) / 86400000); // 1000ms x 60sec x 60min x 24hr
}

localStorage.setItem("lastvisit", recentvisit); // this syntax also works ... localStorage.lastvisit = lastvisit;

document.querySelector("#lastvisit").textContent = `It has been ${timesincelastvisit} days since yer last visit. Enjoy the followin' community supplied images.`;