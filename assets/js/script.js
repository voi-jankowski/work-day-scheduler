// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var hour9 = $('#hour-9');
var hour10 = $('#hour-10');
var hour11 = $('#hour-11');
var hour12 = $('#hour-12');
var hour1 = $('#hour-1');
var hour2 = $('#hour-2');
var hour3 = $('#hour-3');
var hour4 = $('#hour-4');
var hour5 = $('#hour-5');

var schedulerList = $('#scheduler');
// Set the variable to establish the number of hourly 
var numHours = schedulerList.children().length;

console.log(numHours);

console.log($('.lead').text());
var listContents = schedulerList.contents('div');
console.log(listContents);

event9 = listContents[0].children[1].value;

// var event9 = $('#hour-9 textarea');
console.log(event9);

var buttonEl9 = listContents[0].children[2];
// var id9 = buttonEl9.sibling('textarea');
console.log(buttonEl9);
// console.log(id9);

// event9.text('Try this!');
// console.log(event9.text());

// TODO: Add code to display the current date in the header of the page.
// Checks if the document is ready and executes the funtion every second to refresh the clock, so the time is up to date.
$(document).ready(function()
{
    function setTime() {
        var today = dayjs();
        var timeNow = today.format('MMMM D, YYYY h:mm a');
        $('#date-time').text(timeNow);
    }

    setInterval(function()
    {
        setTime()
    }, 1000); 
})

// Renders the event-descr from the local storage and 

function getEvents() {


}

// displays them in the textareas.

for ( var i = 0; i < numHours; i++) {
    var eventText = listContents[i].children[1].value;
  
}

// Save the text from event-descr in a local storage.

function saveEvent(event) {
    
    var buttonEl = $(event.target);
    var eventDescr = buttonEl.siblings('textarea').val();
    var eventHour = buttonEl.parents().attr('id');
    localStorage.setItem(eventHour, eventDescr);
}

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
schedulerList.on('click', '.save-btn', saveEvent);