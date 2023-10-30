const DEBUG = false;

const _topic = 'usecase';
const _key = '5';
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
        //alert( id );
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
                    case 'box':
                        h2.textContent = 'Box';

                        modal.textContent = `How does this information intersect with my prior understanding?`;

                        footer.textContent = `As I was researching how to write my document, I thought of 
                        similarities between use cases, PRDs and documents I have written to describe the user of a web
                        site. The various documents are all written for an intended audience and to serve a specific purpose.
                        Using this information as a starting point, I was able to build on what I already knew.`;
                    break;
                    case 'bin':
                        h2.textContent = 'Bin';

                        modal.textContent = `Where the strategies and skills I used effective for this assignment?`;

                        footer.textContent = `Shifting from a development frame of mind to a research mindset made
                        this assignment easier to complete. Once I did this, I began to search for examples to see how others
                        had approached this in the real world. I combined various ideas to create something I would
                        feel good about presenting to an employer.`;
                    break;
                    case 'bottle':
                        h2.textContent = 'Bottle';

                        modal.textContent = ` Do I see patterns in what I did?`;

                        footer.textContent = `There were may patterns I saw in the different documents I looked at 
                        for reference. Some were more detailed than others but most contained the same basic information.
                        This was helpful in establishing what I determined to be an industry standard document. Overall I 
                        was able to see a clear pattern in the way I go about getting an assignment done. First I work to 
                        understand what is being asked. Then I attempt to reference anything that I may have learned which 
                        might be related to what I am currently doing. With this information, I then begin to come up with
                        questions. If the topic is unfamiliar to me, I will have more questions than if I am doing something
                        I have done before. In any case, I think try to expand or confirm my knowledge on the topic. And finally
                        I test what I think I know. In the case of writing a program, it is easy to see if the code runs as 
                        expected. Regardless, this is an iterative process.`;
                    break;                    
                    case 'washer':
                        h2.textContent = 'Washer';

                        modal.textContent = `What follow-up questions do I have? `;

                        footer.textContent = `I would like to know if Use Case Documents are used in the real world. And if
                        so, who keeps them updated. One change to a function would quickly outdate the entire document. Also,
                        is this the best way of educating a non-technical individual on what a piece of software does?
                        Personally, I would find a decision tree chart to be much more informative and easier to read. But again, who would
                        maintain this in the real world?`;
                    break;
                    case 'laundry':
                        h2.textContent = 'Laundry';

                        modal.textContent = `What questions will I ask myself next time I'm working these types of problems?`;

                        footer.textContent = `When writing a Use Case Document, the overall advice I got was to keep the document
                        at the level of things you can see. Otherwise, it is easy to got bogged down in the technical 
                        details of what is happening thereby making the document irrelevant for a non-technical audience. Keeping 
                        this in mind helps to make the decisions relevant.  As a result, the first questions I would ask would be, 
                        "who is going to read this?" and "who is the intended audience?" With the answer to those questions, I could
                        customize the document much like one might when submitting a resume.`;
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