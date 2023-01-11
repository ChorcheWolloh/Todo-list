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

    checkForBulletPoints() {

    }
}

// 2. if theres at least one task for the day - that day should have an underline under the number (add class .underline to that li element)
