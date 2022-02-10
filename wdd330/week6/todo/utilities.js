/*
Two here for starters should be good as well...may add more later
/
do a querySelector lookup @param {string} selector The selector passed to querySelector
@return {element} The matching element or null if not found /
*/
export function qs(selector) {
    let element = document.querySelector(selector);
    return isset(element) ? element : null;
}

/*
add a touchend event listener to an element for mobile with a click event fallback for desktops @param {string} 
elementSelector The selector for the element to attach the listener to
* @param {function} callback The callback function to run

*/
export function onTouch(elementSelector, callback) { 
    // https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/
    if ('touchend' in window) {
        // running on touch-capable device
        alert('supports touchend');
        elementSelector.addEventListener('touchend', callback);
    }
    else {
        alert('supports click');
        elementSelector.addEventListener('click', callback);
    }
}

// should we detect touch events?
// https://codeburst.io/the-only-way-to-detect-touch-with-javascript-7791a3346685

/* https://www.creativebloq.com/javascript/make-your-site-work-touch-devices-51411644
blah.addEventListener('touchend', function(e) {
    e.preventDefault();
    e.target.click();
}, false);
blah.addEventListener('click', someFunction, false);
*/