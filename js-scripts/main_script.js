import ToDoList from "./todo_list.js";
import Calendar from "./calendar.js";
import ProgressBar from "./progress_bar.js";


// ALL REQUIRED ELEMENTS 

const todoHeading = document.querySelector("#todo_heading");
const entry = document.querySelector("#entry");
const addIcon = document.querySelector("#add_icon");
const bulletPoints = document.querySelector("#bullet_points");
const progressBar = document.querySelector("#progress_bar");
const bar = document.querySelector("#bar");
const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");
// will be an object containing all li elements with class day
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


// EVENT LISTENERS

addIcon.addEventListener('click', () => {
    toDolist.addBulletPoints();
})    

window.onload = () => {
    toDolist.refreshBulletPointList();
    calendar.renderCalendar(currYear,currMonth);
    // Collects all days in one object,
    // after that adds event listeners to every li element 
    // that change day and month variables in toDolist which
    // when updateToDoHeading called, changes the heading accordingly
    // it is done after each renderCalendar callback
    dayElements = document.querySelectorAll(".day");
    dayElements.forEach(day => {
    day.addEventListener('click', () => {
        toDolist.day = day.textContent;
        toDolist.month = months[currMonth];
        toDolist.updateToDoHeading();
        // refreshBulletPointList should probably be called here
        toDolist.refreshBulletPointList();
        })
    });
}    


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
        // Collects all days in one object,
        // after that adds event listeners to every li element 
        // that change the heading of the ToDo list accordingly
        // it is done after each renderCalendar callback
        dayElements = document.querySelectorAll(".day");
        dayElements.forEach(day => {
        day.addEventListener('click', () => {
            toDolist.day = day.textContent;
            toDolist.month = months[currMonth];
            toDolist.updateToDoHeading();
            // refreshBulletPointList should probably be called here
            toDolist.refreshBulletPointList();
            })
        });
    })
});

