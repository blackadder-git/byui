const DEBUG = false;

const _topic = 'hibernate';
const _key = '9';
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
                    case 'paint':
                        h2.textContent = 'Paint can';

                        modal.textContent = `What have I learned about my strengths and my areas in need of improvement?`;

                        footer.textContent = `When I believed this class was going to introduce us to Android development,
                        I incorrectly believed Hibernate was a database. I was excited to learn to store data in something
                        other than a file. Being able to throw away an idea that proves not to work is a strength I am 
                        improving. I've learned there is balance between staying with one idea and being able to search for
                        a better one.`;
                    break;
                    case 'blades':
                        h2.textContent = 'Blades';

                        modal.textContent = `How does this information conflict with my prior understanding?`;

                        footer.textContent = `Previous to this lesson, I thought Hibernate was a database. Once I learned
                        it was not, I questioned the value of learning the topic. How many times in the real world does a
                        developer swap out the underlying database? I don't know but I don't imagine often. I suppose if 
                        learning Hibernate means you can use any database that has drivers it makes more sense as you would 
                        only need to install the correct drivers.`;
                    break;
                    case 'glove':
                        h2.textContent = 'Old glove';

                        modal.textContent = `What is confusing about this topic?`;

                        footer.textContent = `The most difficult part of this topic (most topics) for me was getting the 
                        configuration to work correctly. Although I watched multiple tutorials, many seemed to be outdated
                        including the videos for this class. Thankfully, I found others that pointed me in the right
                        direction. The IntelliJ interface was similar enough that I could find the right includes and 
                        verify that I was making progress. Until I actually saw my database being updated, I wasn't sure
                        that I was on the right track, but when I did see the content change, it was a good feeling.`;
                    break;
                    case 'chair':
                        h2.textContent = 'Chair';

                        modal.textContent = `What strategy did I use to solve this problem that was helpful?`;

                        footer.textContent = `I chose to present on this technology because I was unsure of how to work
                        with it. This way, I was forced to learn it. Getting the drivers installed was a bit confusing, 
                        and while I figure out how to create and update a database record, I didn't implement a delete 
                        in the time before the assignment was due.`;
                    break;
                    case 'bucket':
                        h2.textContent = 'Bucket';

                        modal.textContent = `Do I see patterns in what I did?`;

                        footer.textContent = `WordPress uses a similar pattern to hide its database interactions 
                        behind a layer of calls that change information. Understanding this helped me to see the benefit
                        of using Hibernate when writing Java programs.`;
                    break;
                    case 'plans':
                        h2.textContent = 'Blueprints';

                        modal.textContent = `What can/should I do next?`;

                        footer.textContent = `I would like to incorporate what I have learned to do with Hibernate into
                        my final project. My only reservation is that because I would like to create an Android app, and
                        I believe Android uses Firebase, is there really a benefit to adding an additional layer of
                        complexity to my code?`;
                    break;
                    case 'light':
                        h2.textContent = 'Light bulb';

                        modal.textContent = ` What conclusions can I make?`;

                        footer.textContent = `Knowing how to use Hibernate is an important skill to have and I can see
                        the value in being able to create generic database calls that will work on whatever backend is 
                        added. Until I am more comfortable with how to configure various dependencies and libraries in 
                        my project, I am hesitant to experiment.`;
                    break;
                    case 'wrenches':
                        h2.textContent = 'Wrenches';

                        modal.textContent = ` What questions will I ask myself next time I'm working these types of problems?`;

                        footer.textContent = `The next time I try to work with a new technology, branch, version, etc I will ask 
                        myself does this work with what I have. More importantly, I will attempt to verify compatibility before 
                        I begin. Once I can assure two technologies are compatible, it's easier to focus on the development vs 
                        the configuration.`;
                    break;
                    case 'saw':
                        h2.textContent = 'Saw';

                        modal.textContent = `Why is this idea important?`;

                        footer.textContent = `Even though Hibernate didn't turn out to be the technology I thought it was, 
                        I believe knowing it exists and what problem it attempts to solve is valuable in and
                        of itself. There may very well come a time when the technology proves to be exactly what I need.`;
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