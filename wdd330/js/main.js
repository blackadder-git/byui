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
        }
    ]

    // loop weeks
    weeks.forEach ( link => {
        let week = document.createElement('li');
        week.innerHTML = `<a href="${link.url}">${link.label}</a>`;
        weekList.append(week);
    });
}

addWeeks();