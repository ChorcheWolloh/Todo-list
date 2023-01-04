class ToDoList {
    constructor(day, month, heading, input, bulletPoints, progressBar){
        this.day = day;
        this.month = month;
        this.heading = heading;
        this.input = input;
        this.bulletPoints = bulletPoints;
        this.progressBar = progressBar;
    }
    
    bulletPointsArray = [];
    doneBulletPoints = []

    addBulletPoints(){
        // get info from the input
        const bulletPointText = this.input.value;
        // add that info to the bulletpoint array
        this.bulletPointsArray.push(bulletPointText);
        // append div element with checkbox and bulletpoint text to the main bullet poin div
        this.bulletPoints.appendChild(this.createBulletEntry(bulletPointText));

        //console.log(this.bulletPointsArray);
    }

    createBulletEntry(input){
        //define all elements for bulletpoint entry
        const entry = document.createElement('div');
        const checkbox = document.createElement("input");
        const span = document.createElement('span');
        const deleteBtn = document.createElement('input');

        checkbox.setAttribute('type', 'checkbox');
        checkbox.className = "bullet_checkbox";

        deleteBtn.setAttribute('type', 'button');
        deleteBtn.className = "delete_btn";
        deleteBtn.value = 'delete';

        // adds event listener to the checkbox
        checkbox.addEventListener('change', () => {
            this.markAsDone(span);
        })

        span.textContent = input;
        entry.appendChild(checkbox);
        entry.appendChild(span);
        entry.appendChild(deleteBtn);
        
        return entry;
    }


    markAsDone(target) {
        // cross out the entry and add it to the 
        target.classList.toggle("checked");

        this.doneBulletPoints.push(target.textContent);
        this.bulletPointsArray.pop(target.textContent);
        console.log("all bullet points: " + this.bulletPointsArray);
        console.log("done bullet points: " + this.doneBulletPoints);

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

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let currentMonth = currentDate.getMonth();// gets in number from 0
let currentDay = currentDate.getDate(); 

let todoHeading = document.querySelector("#todo_heading");
let entry = document.querySelector("#entry");
let addBtn = document.querySelector("#add_btn");
let bulletPoints = document.querySelector("#bullet_points");
let progressBar = document.querySelector("#progress_bar");
let checkbox = document.querySelector(".bullet_checkbox");


let toDolist = new ToDoList(currentDay, months[currentMonth],todoHeading,entry, bulletPoints, progressBar);

addBtn.addEventListener('click', () => {
    toDolist.addBulletPoints();
})

// checkbox.addEventListener('change', () => {
//     toDolist.markAsDone();
// })