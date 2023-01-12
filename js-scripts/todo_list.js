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
        
        span.className = "delete-cross material-symbols-outlined";
        span.innerHTML = "close";
        
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', `checkbox-${object.index}`)
        checkbox.className = "bullet-checkbox";
        
        label.textContent = object['bulletPoint'];
        label.setAttribute('for', `checkbox-${object.index}`);

        entry.setAttribute('id', `bullet-${object.index}`);

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
            let bullet_point = document.querySelector(`#bullet-${entry.index}`);
            // checks if the date of the entry equals to the day and month set in the class
            // those this.day this.month variables are modified in calendar event listeners
            // then checks if that element already in the DOM and if not
            // adds the entry, otherwise removes the entry
            if (entry.date === `${this.day} ${this.month}` && !(document.body.contains(bullet_point))) {
                this.createBulletEntry(entry);
            } else if (document.body.contains(bullet_point)) {
                bullet_point.remove();
            }
        }
    }

    updateToDoHeading(){
        this.heading.textContent = `Tasks for the ${this.day}th of ${this.month}`;
    }
}