const DEBUG = false;

const _topic = 'threads';
const _key = '6';
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
                    case 'rug':
                        h2.textContent = 'Rug';

                        modal.textContent = `Why is this idea important?`;

                        footer.textContent = `I really haven't had the chance to write programs that dealt with multiple
                        threads however I know that understanding how and when to do so is important. Why? because running
                        an entire program in a single thread can make it run slower depending on what the program is trying
                        to do.`;
                    break;
                    case 'art':
                        h2.textContent = 'Art';

                        modal.textContent = `What strategy did I use to solve the problems this lesson presented?`;

                        footer.textContent = `Wanting to really understand this technology, I signed up to present it to
                        my group a week before we had to do our assignment. I tried to come up with a good program that
                        would showcase different threads, runnables and executors. This proved meaningful as I saw the different
                        ants in my program carry out work independently of one another. I tried to imagine other situations
                        when this would be important. When I was working on my final project, having a counter run on a new
                        thread proved to be exactly what I needed.`;
                    break;
                    case 'books':
                        h2.textContent = 'Books';

                        modal.textContent = `How does this connect with what I already know?`;

                        footer.textContent = `Before this week, I knew very little about threads. I only knew that code could run
                        synchronously or asynchronously but I was't sure how to make this happen or even exactly when.`;
                    break;                    
                    case 'plant':
                        h2.textContent = 'Large plant';

                        modal.textContent = `Do I see patterns in what I did?`;

                        footer.textContent = `Once I was able to implement a proper thread, it was easy to create a runnable. Having
                        two ways to do essentially the same thing meant I wanted to understand when to use one vs the other. I began
                        to look for patterns. Fortunately the answer was not hard to understand. Use threads when you are sure you won't 
                        need to extend the class later on. Implement runnables if you are not sure. And user executors when you want to 
                        keep a general pool of workers around rather than have to create them each time. I was able to draw a nice 
                        parallel with this model and that of a restaurant hiring servers.`;
                    break;
                    case 'sm_plant':
                        h2.textContent = 'Small plant';

                        modal.textContent = `How did my mindset affect how I approached my work?`;

                        footer.textContent = `In order to understand this topic well, I was willing to ask multiple questions and
                        really test what I thought I knew. I think when you are willing to fail at something, you open yourself 
                        up even more to learn. In my case, not knowing much about this technology meant I was less likely to do
                        what I knew and more willing to simply try different things.`;
                    break;
                    case 'drawers':
                        h2.textContent = 'Drawers';

                        modal.textContent = `What questions will I ask myself next time I'm working these types of problems?`;

                        footer.textContent = `Now when I write a program, I ask myself if there are parts that can/should be run
                        in the background. Specifically, if my program is accessing the filesystem or internet, it is a signal that 
                        perhaps that part of the code can be done in its own thread.`;
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