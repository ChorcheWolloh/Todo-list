export default class Calendar {
    constructor(currentDate, daysTag){
        this.daysTag = daysTag;
        this.currentDate = currentDate;
        this.months =  ["January", "February", "March", "April", "May", "June", "July", 
        "August", "September", "October", "November", "December"];
    }
    
    renderCalendar(currYear, currMonth){
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
        let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); 
        let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); 
        let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `<li class="day inactive previous">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday = i === new Date().getDate() && currMonth === new Date().getMonth() 
                        && currYear === new Date().getFullYear() ? " active" : "";
            liTag += `<li class="day${isToday}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="day inactive next">${i - lastDayofMonth + 1}</li>`;
        }

        this.currentDate.innerText = `${this.months[currMonth]} ${currYear}`;
        this.daysTag.innerHTML = liTag;
    }

    changeActiveDay(allDays, currentDay) {
        // loops over all days in the object
        // if any day has class active - removes it
        // then adds class active to the pressed day
        allDays.forEach(day => {
            if (day.classList.contains("active")) {
                day.classList.remove("active");
            }
            currentDay.classList.add("active");
        });
    }

    checkForBulletPoints(allDays, currMonth) {
        // this function should check if there's tasks for all days
        // and if so add class has-tasks to correct li items
        // to do so, it first needs to get all tasks from local storage
        // after which get dates from those tasks 
        // and set li elements class accordingly
        let allDates = [];
        for (let i = 0; i < window.localStorage.length; i++){
            let index = window.localStorage.key(i);
            let entry = JSON.parse(window.localStorage.getItem(`${index}`));
            allDates.push(entry.date);
        }
        let datesThatHaveTasks = allDates.filter(onlyUnique);
        
        allDays.forEach(day => {
            if (datesThatHaveTasks.includes(`${day.innerHTML} ${this.months[currMonth]}`)) {
                day.classList.add("has-tasks");
            }
        });

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
    }
}

// underscoring works partily - it works on next prev icons and on load
// if you remove tasks - no underscore
// but ideally it needs to update when task is added or removed without
// reloading or changing months back-forth

// if you change month and then go back active day sets back to the current day