export default class ToDoList {
    constructor(day, month, heading, input, bulletPoints, progressBar, bar){
        this.day = day;
        this.month = month;
        this.heading = heading;
        this.input = input;
        this.bulletPoints = bulletPoints;
        this.progressBar = progressBar;
        this.bar = bar;
        this.numberOfBulletPoints = window.localStorage.length;
        this.updateToDoHeading(this.day, this.month);
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
        this.heading.textContent = `Tasks for the ${day}th of ${month}`;
        // otherwise update heading with day and month from calendar 
    }
}