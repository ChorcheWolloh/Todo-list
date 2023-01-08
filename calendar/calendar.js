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
