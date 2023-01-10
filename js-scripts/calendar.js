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
            liTag += `<li class="day inactive">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday = i === new Date().getDate() && currMonth === new Date().getMonth() 
                        && currYear === new Date().getFullYear() ? " active" : "";
            liTag += `<li class="day${isToday}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="day inactive">${i - lastDayofMonth + 1}</li>`;
        }

        this.currentDate.innerText = `${this.months[currMonth]} ${currYear}`;
        this.daysTag.innerHTML = liTag;
    }

    chooseNewDate(){
        // return the day and month of the clicked li element
    }
}