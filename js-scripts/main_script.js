import ToDoList from "./todo_list.js";
import Calendar from "./calendar.js";
import ProgressBar from "./progress_bar.js";


// ALL REQUIRED ELEMENTS 

const todoHeading = document.querySelector("#todo-heading");
const entry = document.querySelector("#entry");
const addIcon = document.querySelector("#add-icon");
const bulletPoints = document.querySelector("#bullet-points");
const progressBar = document.querySelector("#progress-bar");
const bar = document.querySelector("#bar");
const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");
// will be an object containing all li elements with class day
const deleteSpan = document.querySelectorAll(".delete-cross");
let dayElements;


// DATE VARIABLES

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
let currDay = date.getDate();

const months = ["January", "February", "March", "April", "May", "June", "July", 
                "August", "September", "October", "November", "December"];



// CLASSES INSTANCES

let toDolist = new ToDoList(currDay, months[currMonth],todoHeading,entry, bulletPoints, progressBar, bar);

let calendar = new Calendar(currentDate, daysTag);

let progressBarClass = new ProgressBar(progressBar);


// EVENT LISTENERS


window.onload = () => {
    toDolist.refreshBulletPointList();
    calendar.renderCalendar(currYear,currMonth);
    // Collects all days in one object,
    // after that adds event listeners to every li element 
    // that change day and month variables in toDolist which
    // when updateToDoHeading called, changes the heading accordingly
    // after which changeActiveDay makes sure that only one element in the calendar
    // has the class active 
    // it is done after each renderCalendar callback
    dayElements = document.querySelectorAll(".day");
    calendar.checkForBulletPoints(dayElements, currMonth);
    dayElements.forEach(day => {
        day.addEventListener('click', () => {
            // checks if li element has previous or next class and increment/decrement currMonth accordingly
            if (day.classList.contains('previous')) {
                toDolist.day = day.textContent;
                toDolist.month = months[currMonth-1];
            } else if (day.classList.contains('next')) {
                toDolist.day = day.textContent;
                toDolist.month = months[currMonth+1];
            } else {
                toDolist.day = day.textContent;
                toDolist.month = months[currMonth];
            }
            calendar.changeActiveDay(dayElements, day); // passing in the object with all elements and current day
            toDolist.updateToDoHeading();
            toDolist.refreshBulletPointList();
        });
    });
}

addIcon.addEventListener('click', () => {
    toDolist.addBulletPoints();
    dayElements = document.querySelectorAll(".day");
    calendar.checkForBulletPoints(dayElements, currMonth);
})    

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () =>{
        if (icon.id === "prev") {
            currMonth = currMonth - 1;
        } else {
            currMonth = currMonth + 1;
        }
        if (currMonth < 0 || currMonth > 11) { 
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); 
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        calendar.renderCalendar(currYear, currMonth);
        dayElements = document.querySelectorAll(".day");
        calendar.checkForBulletPoints(dayElements, currMonth);
        dayElements.forEach(day => {
            day.addEventListener('click', () => {
                if (day.classList.contains('previous')) {
                    toDolist.day = day.textContent;
                    toDolist.month = months[currMonth-1];
                } else if (day.classList.contains('next')) {
                    toDolist.day = day.textContent;
                    toDolist.month = months[currMonth+1];
                } else {
                    toDolist.day = day.textContent;
                    toDolist.month = months[currMonth];
                }
                calendar.changeActiveDay(dayElements, day); 
                toDolist.updateToDoHeading();
                toDolist.refreshBulletPointList();
            });
        });
    });
});
