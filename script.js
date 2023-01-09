class ToDoList {
    constructor(day, month, heading, input, bulletPoints, progressBar, bar){
        this.day = day;
        this.month = month;
        this.heading = heading;
        this.input = input;
        this.bulletPoints = bulletPoints;
        this.progressBar = progressBar;
        this.bar = bar;
        this.numberOfBulletPoints = window.localStorage.length;
        this.updateToDoHeading();
    }

    addBulletPoints(){
        const bulletPointText = this.input.value;
        if (bulletPointText === "") {
            return;
        } else {
            this.sendToLocalStorage(bulletPointText);
            this.input.value = "";
            this.createBulletEntry(this.getFromLocalStorage(this.numberOfBulletPoints-1));
        }
    }

    sendToLocalStorage(value){
        let bulletPointObj = {
            'index' : this.numberOfBulletPoints,
            'bulletPoint' : value,
            'done' : false,
            'date' : `${this.day} ${this.month}`
        }

        let storageReadyObj = JSON.stringify(bulletPointObj);
        window.localStorage.setItem(this.numberOfBulletPoints, storageReadyObj);
        this.numberOfBulletPoints++;
    }

    getFromLocalStorage(index){
        return JSON.parse(window.localStorage.getItem(`${index}`));
    }

    removeFromLocalStorage(index){
        window.localStorage.removeItem(index);
    }

    createBulletEntry(object){        
        const entry = document.createElement('div');
        const checkbox = document.createElement("input");
        const label = document.createElement('label');
        const span = document.createElement("span");
        
        span.className = "delete_cross material-symbols-outlined";
        span.innerHTML = "close";
        
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', `${object.index}-checkbox`)
        checkbox.className = "bullet_checkbox";
        
        label.textContent = object['bulletPoint'];
        label.setAttribute('for', `${object.index}-checkbox`);

        entry.setAttribute('id', object.index);

        if (object.done === true) {
            label.classList.add("checked");
            checkbox.checked = true;
        } else {
            label.classList.remove("checked");
            checkbox.checked = false;
        }

        checkbox.addEventListener('change', () => {
            this.markAsDone(label, object);
        })

        span.addEventListener('click', () => {
            entry.remove();
            this.removeFromLocalStorage(object.index)        
        })

        entry.appendChild(checkbox);
        entry.appendChild(label);
        entry.appendChild(span);

        this.bulletPoints.appendChild(entry);
    }

    markAsDone(target, object) {
        target.classList.toggle("checked");
        if (object.done === false) {
            object.done = true;
            window.localStorage.setItem(object.index, JSON.stringify(object))
            } else {
                object.done = false;
                window.localStorage.setItem(object.index, JSON.stringify(object))
            } 
        }

    clearLocalStorage(){
        window.localStorage.clear();
    }

    refreshBulletPointList(){
        for (let i = 0; i < window.localStorage.length; i++){
            let index = window.localStorage.key(i);
            let entry = this.getFromLocalStorage(index);
            this.createBulletEntry(entry);
        }
    }

    updateToDoHeading(day, month){
        // depending on the day in the calendar
        // if choosen day in the calendar the same as the current day:
        this.heading.textContent = `Tasks for the ${this.day}th of ${this.month}`;
        // otherwise update heading with day and month from calendar 
    }

}

class Calendar {
    constructor(currentDate, daysTag){ //currYear, currMonth, currDay, date, 
        // this.currYear = currYear;
        // this.currMonth = currMonth;
        // this.date = date;
        // this.currDay = currDay;


        this.daysTag = daysTag;
        this.currentDate = currentDate;

        // this.firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDate();
        // this.lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate(); // getting last date of month
        // this.lastDayofMonth = new Date(this.currYear, this.currMonth, this.lastDateofMonth).getDay(); // getting last day of month
        // this.lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate(); // getting last date of previous month
    }

    // firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    // lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
    // lastDayofMonth = new Date(currYear, currMonth, this.lastDateofMonth).getDay(); // getting last day of month
    // lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    
    
    renderCalendar(firstDayofMonth, lastDateofMonth, lastDayofMonth, lastDateofLastMonth){
        let liTag = "";
        let isToday = "";

        console.log(firstDayofMonth, lastDateofMonth,lastDayofMonth, lastDateofLastMonth);
        // Something is wrong with those variables, first day is zero, and last day of month is 2

        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            if (i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) {
                isToday = "active";
            } else {
                isToday = "";
            }
            liTag += `<li class="${isToday}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
        }

        this.currentDate.innerText = `${months[currMonth]} ${currYear}`;
        this.daysTag.innerHTML = liTag;
    }

    chooseNewDate(){
        // when user presses on a date - return it as a choosen date to the To-do List
    }
}

class ProgressBar {
    constructor(){

    }

    updateProgressBar(){
        // consider total amount of bulletpoints to calculate 100%
        // whenever a bulletpoint is marked as done
        // fill in progress bar for the procentile amount
    }
}


// ALL REQUIRED ELEMENTS 

const todoHeading = document.querySelector("#todo_heading");
const entry = document.querySelector("#entry");
const addIcon = document.querySelector("#add_icon");
const bulletPoints = document.querySelector("#bullet_points");
const progressBar = document.querySelector("#progress_bar");
const bar = document.querySelector("#bar");
const checkbox = document.querySelector(".bullet_checkbox");

const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");


// DATE VARIABLES

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
let currDay = date.getDate();

const months = ["January", "February", "March", "April", "May", "June", "July", 
                "August", "September", "October", "November", "December"];


let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); // getting last day of month
let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month


// CLASSES INSTANCES

let toDolist = new ToDoList(currDay, months[currMonth],todoHeading,entry, bulletPoints, progressBar, bar);

let calendar = new Calendar(currentDate, daysTag); //currYear, currMonth, date, currDay,


// EVENT LISTENERS

addIcon.addEventListener('click', () => {
    toDolist.addBulletPoints();
})    

window.onload = () => {
    toDolist.refreshBulletPointList();
    calendar.renderCalendar(firstDayofMonth, lastDateofMonth,lastDayofMonth, lastDateofLastMonth);
}    

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () =>{
        if (icon.id === "prev") {
            currMonth -= 1;
        } else {
            currMonth += 1;
        }
        if (currMonth < 0 || currMonth > 11) { 
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); 
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        calendar.renderCalendar(firstDayofMonth, lastDateofMonth,lastDayofMonth, lastDateofLastMonth);
    })
});