class ToDoList {
    constructor(day, month, heading, input, bulletPoints, progressBar, bar){
        this.day = day;
        this.month = month;
        this.heading = heading;
        this.input = input;
        this.bulletPoints = bulletPoints;
        this.progressBar = progressBar;
        this.bar = bar;
        this.updateToDoHeading();
        this.numberOfBulletPoints = window.localStorage.length;
        this.updateProgressBar();
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
        const deleteBtn = document.createElement('input');

        entry.setAttribute('id', object.index);

        if (object.done === true) {
            label.classList.add("checked");
            checkbox.checked = true;
        } else {
            label.classList.remove("checked");
            checkbox.checked = false;
        }

        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', `${object.index}-checkbox`)
        checkbox.className = "bullet_checkbox";

        deleteBtn.setAttribute('type', 'button');
        deleteBtn.className = "delete_btn";
        deleteBtn.value = 'delete';

        label.textContent = object['bulletPoint'];
        label.setAttribute('for', `${object.index}-checkbox`);

        checkbox.addEventListener('change', () => {
            this.markAsDone(label, object);
        })
        deleteBtn.addEventListener('click', () => {
            // Could be done in a separate function but whateves
            entry.remove();
            this.removeFromLocalStorage(object.index)        
        })

        entry.appendChild(checkbox);
        entry.appendChild(label);
        entry.appendChild(deleteBtn);

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
        
    updateProgressBar(){
        // consider total amount of bulletpoints to calculate 100%
        let fullBar = this.numberOfBulletPoints;
        for (let i = 0; i < fullBar; i++) {
            
        }
        // whenever a bulletpoint is marked as done
        // fill in progress bar for the procentile amount
    }

    updateToDoHeading(){
        // depending on the day in the calendar
        // if choosen day in the calendar the same as the current day:
        this.heading.textContent = `Tasks for the ${this.day}th of ${this.month}`;
        // otherwise update heading with day and month from calendar 
    }

}

class Calendar {
    constructor(currentDay, currentMonth){
        this.currentDay = currentDay;
        this.currentMonth = currentMonth;
    }

    choosenDay;
    choosenMonth;

    getDay(){
        // when user presses the date in the calendar
        // update choosenDay with that number
    }

    getMonth(){
        // if user chooses the next month 
        // update the choosenMonth
    }

    changeMonth(){
        // when user presses one of the side btns
        // change month to the next or previous one
    }
}

// let currentDate = new Date();
// let currentMonth = currentDate.getMonth();// gets in number from 0
// let currentDay = currentDate.getDate(); 

// let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let todoHeading = document.querySelector("#todo_heading");
let entry = document.querySelector("#entry");
let addBtn = document.querySelector("#add_btn");
let bulletPoints = document.querySelector("#bullet_points");
let progressBar = document.querySelector("#progress_bar");
let bar = document.querySelector("#bar");
let checkbox = document.querySelector(".bullet_checkbox");

// months[currentMonth]

let toDolist = new ToDoList(5, "January",todoHeading,entry, bulletPoints, progressBar, bar);

addBtn.addEventListener('click', () => {
    toDolist.addBulletPoints();
})

window.onload = () => {
    toDolist.refreshBulletPointList();
}


toDolist.updateProgressBar();

// function sends to local storage - event on btn  DONE
// function to get from local storage, convert to usable object DONE
// function to use value for div element
// function that if checked sets the done to true DONE
// function that removes element from local storage if pressed DONE
// function that clears everything

//function that runs when the page is loading - gets everything from local storage and creates bulletpoints with that with that


const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", 
                "August", "September", "October", "November", "December"];


function renderCalendar() {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDate(); // getting first day of month
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); // getting last day of month
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

    let liTag = "";
    let = isToday = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day month and year matched
        if (i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) {
            isToday = "active";
        } else {
            isToday = "";
        }
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () =>{
        // clicked icon is previous - decrement current month, and otherwise
        if (icon.id === "prev") {
            currMonth -= 1;
        } else {
            currMonth += 1;
        }
        if (currMonth < 0 || currMonth > 11) { 
            // if current month less than 0 or greater than 11 create new data of current year and month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // update current year with new date
            currMonth = date.getMonth(); // updating current month with new date month
        } else { // else pass the new date as date value
            date = new Date();

        }
        renderCalendar();
    })
});
