class ToDoList {
    constructor(day){
        this.day = day;
    }
    
    bulletPoints = [];
    doneBulletPoints = []

    addBulletPoints(input){
        // get info from the input
        // add that info to the bulletpoint array
    }

    displayBulletPoints(){
        // display bulletPoint array 
    }

    markAsDone() {
        // if bulletpoint checkbox is marked -
        // cross out the entry and add it to the 
        // doneBulletPoints array
    }

    updateProgressBar(){
        // consider total amount of bulletpoints to calculate 100%
        // whenever a bulletpoint is marked as done
        // fill in progress bar for the procentile amount
    }

    updateToDoHeading(){
        // depending on the day in the calendar
        // update heading with day and month
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
        // if user chooses the next month 
        // update the choosenMonth
    }

}

let currentDate = new Date();
let currentMonth = currentDate.getMonth() + 1;// gets in number from 0
let currentDay = currentDate.getDate(); 

let todoHeading = document.querySelector("#todo_heading");
let entry = document.querySelector("#entry");
let addBtn = document.querySelector("#add_btn");
let bulletPoints = document.querySelector("#bullet_points");
let progressBar = document.querySelector("#progress_bar");