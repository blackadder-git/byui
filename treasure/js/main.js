//alert("Hello! I am an alert box!!");
//console.log("Hello world!");

$( "#unlock" ).on( "click", function() {
    // alert( "Handler for `click` called." );

    let unlocked = 0

    // check 1 puzzle (red) (procrastination monkey)
    // https://www.youtube.com/watch?v=arj7oStGLkU
    let lock1 = $("#lock1").val().toLowerCase().trim()
    console.log(lock1)

    if (lock1 == "fun") {
        // the monkey only cares about easy and "fun"
        unlocked = ++unlocked
    }
    else {
        alert(`Arrgh, ${lock1} can nah be right fer the first lock`)
    }

    // check 2 puzzle (orange) (super mario effect)
    // https://www.youtube.com/watch?v=9vJRopau0g0
    let lock2 = $("#lock2").val().toLowerCase().trim()
    console.log(lock2)

    if (lock2 == "pits") {
        // focus on the princess and not the "pits"
        unlocked = ++unlocked
    }
    else {
        alert(`Arrgh, ${lock2} can nah be right fer the second lock`)
    }

    // check 3 puzzle (yellow) (Elder Uchtdorf, creativity)
    // https://youtu.be/RhLlnq5yY7k
    let lock3 = $("#lock3").val().toLowerCase().trim()
    console.log(lock3)

    if (lock3 == "trust") {
        // the more you "trust" the greater your capacity to create
        unlocked = ++unlocked
    }
    else {
        alert(`Arrgh, ${lock3} can nah be right fer the third lock`)
    }

    // check 4 puzzle (study smart)
    // https://www.youtube.com/watch?v=AL08YZCYShc (Marty Lobdell)
    let lock4 = $("#lock4").val().toLowerCase().trim()
    console.log(lock4)

    if (lock4 == "focused") {
        // your brain has to be "focused" to be really studying
        unlocked = ++unlocked
    }
    else {
        alert(`Arrgh, ${lock4} can nah be right fer the fourth lock`)
    }

    // check 5 puzzle (curiosity stream)
    let lock5 = $("#lock5").val().toLowerCase().trim()
    console.log(lock5)

    if (lock5 == "gold") {
        // 
        unlocked = ++unlocked
    }
    else {
        alert(`Arrgh, ${lock5} can nah be right fer the fifth lock`)
    }

    // check 6 puzzle (iceberg success)
    let lock6 = $("#lock6").val().toLowerCase().trim()
    console.log(lock6)

    if (lock6 == "determination") {
        // one thing people don´t see is determination
        unlocked = ++unlocked
    }
    else {
        alert(`Arrgh, ${lock6} can nah be right fer the sixth lock`)
    }

    // check 7 puzzle (grit)
    let lock7 = $("#lock7").val().toLowerCase().trim()
    console.log(lock7)

    if (lock7 == "twice") {
        // effort counts "twice"
        unlocked = ++unlocked
    }
    else {
        alert(`Arrgh, ${lock7} can nah be right fer the seventh lock`)
    }

    if (unlocked == 7) {
        alert("Arrrg, well done says I ...")

        $("#x").fadeIn();
        
        $("#closeOverlay").click(function() {
            $("#x").fadeOut();
        });
    }
    else {
        const insult = Math.floor(Math.random() * 3) + 1;
        switch (insult) {
            case 1:
                alert("shiver me timbers, ye be a son of a biscuit eater says I")
                break
            case 2:
                alert("avast, this nar be a good way to find the treasure says I")
                break
            case 3:
                alert("shiver me timbers, and ye calls yerself a pirate?")
                break
            default:
                alert("time to walk the plank mate ...")
                break
        }
    }    
});