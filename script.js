class ToDoList {
    constructor(day, month, heading, input, bulletPoints, progressBar){
        this.day = day;
        this.month = month;
        this.heading = heading;
        this.input = input;
        this.bulletPoints = bulletPoints;
        this.progressBar = progressBar;
        this.updateToDoHeading()
        this.numberOfBulletPoints = window.localStorage.length;
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
        console.log(this.numberOfBulletPoints);
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
        console.log(object);
        const entry = document.createElement('div');
        const checkbox = document.createElement("input");
        const span = document.createElement('span');
        const deleteBtn = document.createElement('input');

        entry.setAttribute('id', object.index);

        if (object.done === true) {
            span.classList.add("checked");
            checkbox.checked = true;
        } else {
            span.classList.remove("checked");
            checkbox.checked = false;
        }

        checkbox.setAttribute('type', 'checkbox');
        checkbox.className = "bullet_checkbox";

        deleteBtn.setAttribute('type', 'button');
        deleteBtn.className = "delete_btn";
        deleteBtn.value = 'delete';

        span.textContent = object['bulletPoint'];

        checkbox.addEventListener('change', () => {
            this.markAsDone(span, object);
        })
        deleteBtn.addEventListener('click', () => {
            // Could be done in a separate function but whateves
            entry.remove();
            this.removeFromLocalStorage(object.index)        
        })

        entry.appendChild(checkbox);
        entry.appendChild(span);
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
        // whenever a bulletpoint is marked as done
        // fill in progress bar for the procentile amount
    }

    updateToDoHeading(){
        // depending on the day in the calendar
        // update heading with day and month
        this.heading.textContent = `Tasks for the ${this.day}th of ${this.month}`
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
let currentMonth = currentDate.getMonth();// gets in number from 0
let currentDay = currentDate.getDate(); 

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

window.onload = () => {
    toDolist.refreshBulletPointList();
}


// function sends to local storage - event on btn  DONE
// function to get from local storage, convert to usable object DONE
// function to use value for div element
// function that if checked sets the done to true DONE
// function that removes element from local storage if pressed DONE
// function that clears everything

//function that runs when the page is loading - gets everything from local storage and creates bulletpoints with that with that