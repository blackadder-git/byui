const DEBUG = false;

const _topic = 'error';
const _key = '7';
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
                    /*
                    Where the strategies and skills I used effective for this assignment?
                    What can/should I do next?
                    How did my mindset affect how I approached my work?
                    What have I learned about my strengths and my areas in need of improvement?
                    how can I best use my strengths to learn?
                    How am I progressing as a learner?
                    Do I see patterns in what I did?
                    How can my learning environment be improved?
                    Why is this idea important?
                    What follow-up questions do I have? 
                    How does this connect with what I already know?
                    Which parts or terms are new to me, and which parts do I recognize?
                    What stands out to me? What makes me wonder?
                    Does this answer make sense given the information provided?
                    What strategy did I use to solve this problem that was helpful?
                    How does this information conflict with my prior understanding?
                    How does this information relate to what we learned last week?
                    What questions will I ask myself next time I'm working these types of problems?
                    What is confusing about this topic?
                    What are the relationships between these two concepts?
                    What conclusions can I make?
                    */
                    case 'basket':
                        h2.textContent = 'Basket';

                        modal.textContent = `Do I see patterns in what I did?`;

                        footer.textContent = `Most languages employ some sort of exception handling/error detection. 
                        Learning to do this in Java is necessary. As an added bonus, I was able to identify patterns in the
                        various methods I created and extract out the logic into a new single method. DRY.`;
                    break;
                    case 'microwave':
                        h2.textContent = 'Microwave';

                        modal.textContent = `Why is this idea important?`;

                        footer.textContent = `No one wants to see errors. And even if a developer writes error free code
                        there are still runtime exceptions that can occur. So, protecting users data and application state
                        makes for a better program.`;
                    break;
                    case 'spoons':
                        h2.textContent = 'Spoons';

                        modal.textContent = `What is confusing about this topic?`;

                        footer.textContent = `Java has many potential errors/exceptions. Learning when to use one and more importantly
                        how to recover (exit/continue) is important is confusing. The ide identified certain required blocks I needed to 
                        wrap in try/catch but I am sure I will learn to use others over time.`;
                    break;
                    case 'oven':
                        h2.textContent = 'Oven';

                        modal.textContent = `What strategy did I use to solve this problem that was helpful?`;

                        footer.textContent = `First I read. Then I wrote. I ran my program intent on breaking it. I wanted to 
                        see what would happen if I used the wrong sort of data, if I entered no data, if the case didn't match, 
                        if strings contained spaces, etc. When we learn about unit testing, I hope to learn a better way to test 
                        the code I write.`;
                    break;
                    case 'coffee':
                        h2.textContent = 'Coffee';

                        modal.textContent = `How did my mindset affect how I approached my work?`;

                        footer.textContent = `Knowing that I want to learn this topic well made it easier to spend sufficient
                        time to feel like I understood what I was doing. Because there are so many possibilities, I knew I wouldn't
                        be able to try every combination. For that reason, I looked for patterns an best practices in the samples 
                        I reviewed before writing my code.`;
                    break;
                    case 'sink':
                        h2.textContent = 'Sink';

                        modal.textContent = `What stands out to me? What makes me wonder?`;

                        footer.textContent = `Java has a finally block which is guaranteed to run. I also remember from a previous
                        class that you can create a try block with parameters in order to guarantee that resources will be closed.
                        I wonder how often that is actually done in the real world. My preference is to add the logic to finally.`;
                    break;
                    case 'cupboard':
                        h2.textContent = 'Cupboard';

                        modal.textContent = `How am I progressing as a learner?`;

                        footer.textContent = `I am continuing to progress as a learner question by question and answer by answer. I
                        believe the skills I learned this week with respect to error handling and data validation will serve every 
                        program I write in the future.`;
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