import ToDoList from "./js-scripts/todo_list.js";
import Calendar from "./js-scripts/calendar.js";
import ProgressBar from "./js-scripts/progress_bar.js";


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
    })
});