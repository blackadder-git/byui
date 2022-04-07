function addWeeks() {
    let weekList = document.querySelector("#weekList");
    const weeks = [
        {
          label: "Week 1",
          url: "week1/index.html"
        },
        {
            label: "Week 2",
            url: "week2/index.html"
        },
        {
            label: "Week 3",
            url: "week3/index.html"
        },
        {
            label: "Week 4",
            url: "week4/index.html"
        },
        {
            label: "Week 5",
            url: "week5/index.html"
        },
        {
            label: "Week 6 (Todo App)",
            url: "week6/todo/index.html"
        },
        {
            label: "Week 7",
            url: "week7/index.html"
        },
        {
            label: "Week 8",
            url: "week8/index.html"
        },
        {
            label: "Week 9",
            url: "week9/index.html"
        },
        {
            label: "Week 10",
            url: "week10/index.html"
        },
        {
            label: "Week 14 (Final Project)",
            url: "beehive/index.html"
        },          
    ]

    // loop weeks
    weeks.forEach(link => {
        let week = document.createElement('li');
        week.innerHTML = `<a href="${link.url}">${link.label}</a>`;
        weekList.append(week);
    });
}

addWeeks();