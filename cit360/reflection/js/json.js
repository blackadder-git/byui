const DEBUG = false;

const _topic = 'json';
const _key = '8';
key = document.querySelector(".key");

let topic = JSON.parse( localStorage.getItem( _topic ));

if ( topic == null ) {
    topic = [];
}
else {
    isUnlocked();
}

// add listeners for all the clues
const clues = document.querySelectorAll( '.clue' );
clues.forEach(clue => {
    clue.addEventListener('click', (e) => {
    
        const id = e.target.getAttribute('id');
        // alert( id );
        if ( !topic.includes( id )) {

            topic.push( id );
            
            key.innerHTML = parseInt( key.innerHTML ) + 1;

            if ( key.innerHTML == _key ) {
                topic.push('cracked');
            }

            localStorage.setItem( _topic, ( JSON.stringify( topic )));
        }
        else {
            // alert('duplicate');
        }
        isUnlocked();
    });
});


// has this page been cracked ?
function isUnlocked() {
    if ( topic.includes("cracked") ) {
        key.innerHTML = _key;
        document.querySelector('.key').classList.add( 'correct' );
        alert( 'Congratulations, you cracked the code' );
    }
    else {
        key.innerHTML = topic.length;
    }
}


class Controller {
 
    /****************************************
     * constructor
     *****************************************/
    constructor() {
        this.openModalListener();
        this.closeModalListener();
    }

    // open modal dialog
    openModalListener() {
        if (DEBUG) console.log('open modal listener');

        /*
            add class of openModal to element
            add data-id to element
        */
        const modals = document.querySelectorAll('.openModal');

        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (DEBUG) console.log('show modal');
                let modalWindow = document.querySelector('#modal');
                const showModal = e.currentTarget.getAttribute('id');
                let h2 = document.querySelector('.modal-header h2');
                let modal = document.querySelector('.modal-content');
                let footer = document.querySelector('.modal-footer');

                switch( showModal ) {
                    case 'towel':
                        h2.textContent = 'Towel';

                        modal.textContent = `Do I see patterns in what I did?`;

                        footer.textContent = `In several previous classes, I used JSON. In a class I am 
                        taking now, I learned to make REST calls. This seems to essentially be what I am doing
                        when I use the HTTP/URL calls to request data from an external source. In any case, having
                        familiarity with the topic and seeing patterns that carry over from other languages in the
                        ways that these technologies are used enabled me to focus on the specific ways of using JSON
                        and HTTP/URL with Java.`;
                    break;
                    case 'basket':
                        h2.textContent = 'Basket';

                        modal.textContent = `How did my mindset affect how I approached my work?`;

                        footer.textContent = `As I've though of the programs I'd like to write, I view being able to 
                        interact with resources on the web as a game changer.  No longer does my code need to live
                        and work in isolation. This is the mindset I had as I wrote my program. Having a clear intention
                        of what I wanted to learn made it easier to ask the right questions.`;
                    break;
                    case 'candles':
                        h2.textContent = 'Candles';

                        modal.textContent = `What is confusing about this topic?`;

                        footer.textContent = `While the HTTP/URL part seemed pretty straight forward, wrapping my 
                        head around the object mapper was a bit tricky.  Once I could see that I was able to turn JSON
                        into objects and vice versa, it was one of those magical experiences like turing on a light or
                        driving a car. Even though I didn't completely understand what was happening, I understood 
                        enough to get it working.`;
                    break;
                    case 'soaps':
                        h2.textContent = 'Soaps';

                        modal.textContent = `What can/should I do next?`;

                        footer.textContent = `I can already think of ways I'd like to incorporate this technology into
                        my final project. Next, I should create some additional endpoints with different JSON strings.
                        In addition, if I want to update the data in a database, I need to consider where I can host this
                        and how best to implement the backend.`;
                    break;
                    case 'light':
                        h2.textContent = 'Light';

                        modal.textContent = `What strategy did I use to solve the problems this lesson presented?`;

                        footer.textContent = `To get this assignment working, I imagined I was a user and logically
                        walked through the steps the program and I would need to perform in order to reach the end. Looking
                        back, I was writing a Sequence Diagram in my head without knowing it. Taking that linear approach,
                        I worked on each piece of the program and tested to make sure I was where I believe I should be. On 
                        failure, I retraced my steps and figured out what change were needed. This approach proved to work well overall.`;
                    break;
                    case 'tub':
                        h2.textContent = 'Bathtub';

                        modal.textContent = `How can my learning environment be improved?`;

                        footer.textContent = `I got sick this week and needed to change my study area. Rather than
                        move all my cables, screens, drives, papers, etc each time, I got a box from the supermarket and created a 
                        little mobile office. Now, at a moments notice, I can easily relocate my office from one room to another.
                        I am much more able to change where I study in order to take advantage of the best learning conditions on 
                        any given day.`;
                    break;
                    case 'mirror':
                        h2.textContent = 'Mirror';

                        modal.textContent = `What questions will I ask myself next time I'm working these types of problems?`;

                        footer.textContent = `I often find the best questions to ask, even before "how", are "why would
                        I implement this". If I can understand what type of problem something is meant to solve, it makes
                        learning the how so much easier.`;
                    break;
                    case 'drawer':
                        h2.textContent = 'Drawer';

                        modal.textContent = `What have I learned about my strengths and my areas in need of improvement?`;

                        footer.textContent = `I have come to learn that teaching is a great way to turn something I don't 
                        yet understand into a strength. While I was able to do this assignment in a way that makes sense to me
                        I would have liked to compare my implementation with best practices to see where I can improve. I wish 
                        this class had some sort of code review set up perhaps after each assignment was turned it. Getting 
                        people to comment on what I did and seeing how others implemented their solutions would be interesting.`;
                    break;
                 }

                document.querySelector("#modal").classList.add("is-visible");
            });
        });
    }

    // close modal dialog
    closeModalListener() {
        if (DEBUG) console.log('close modal');

        document.querySelector('.closeModal').addEventListener('click', (e) => {
            document.querySelector("#modal").classList.remove("is-visible");
        });
    }
}

const controller = new Controller();