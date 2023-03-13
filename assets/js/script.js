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

// Set the variable to establish the number of time-blocks for the loop in getEvents function.
var numHours = schedulerList.children().length;

// Set the variable for all <div> elements inside the container.
var listContents = schedulerList.contents('div');


// TODO: Add code to display the current date in the header of the page.
// Add variables for time
var today = dayjs();
var hourNow = today.format('H');
console.log(hourNow);

// Checks if the document is ready and executes the funtion every second to refresh the clock, so the time is up to date.
$(document).ready(function()
{
    function setTime() {
        
        var timeNow = today.format('MMMM D, YYYY h:mm a');
        $('#date-time').text(timeNow);
    }

    setInterval(function()
    {
        setTime()
        
    }, 1000); 
})




function setColors() {
    for ( var i = 0; i < numHours; i++) {
        // Set the variable to get the id name of each corresponding  time-block, which would be the relevant key value.
        var eventId = listContents[i].getAttribute('id');
    
        // Use substring() method to extract the hour number only, it removes 'hour-' from each eventHour.
        var eventHour = eventId.substring(5);   
        console.log(eventHour);
        // Use conditions to change class to past, present and future depending on the hourNow
     
        if (eventHour > hourNow && !listContents[i].classList.contains('future')) {
            listContents[i].classList.add('future');
            if (listContents[i].classList.contains('past')) {
                listContents[i].classList.remove('past');
            } 
            if (listContents[i].classList.contains('present')) {
                listContents[i].classList.remove('present');
            } 
            
        }
        
        if (eventHour == hourNow && !listContents[i].classList.contains('present')) {
            if (listContents[i].classList.contains('past')) {
                listContents[i].classList.add('present');
                listContents[i].classList.remove('past');
            } 
            if (listContents[i].classList.contains('future')) {
                listContents[i].classList.add('present');
                listContents[i].classList.remove('future');
            } 
            
        }

        if (eventHour < hourNow && !listContents[i].classList.contains('past')) {
            if (listContents[i].classList.contains('present')) {
                listContents[i].classList.add('past');
                listContents[i].classList.remove('present');
            } 
            if (listContents[i].classList.contains('future')) {
                listContents[i].classList.add('past');
                listContents[i].classList.remove('future');
            } 
            
        }
    
      
    }
}

setColors();


// Renders the event-descr from the local storage and 

function getEvents() {
    
    // Set loop to fill all the time-blocks with saved events.
    for ( var i = 0; i < numHours; i++) {
        // Set the variable for the textarea in each time-block.   
        var eventText = listContents[i].children[1];
        // Set the variable to get the id name of each corresponding  time-block, which would be the relevant key value.
        var eventKey = listContents[i].getAttribute('id');
        // Render the saved event with that key value.
        var savedEvent = localStorage.getItem(eventKey);
        
        // displays them in the textareas.
        eventText.value = savedEvent;
    }
    
}

// Save the text from event-descr in a local storage.

function saveEvent(event) {
    // setting variable for the button that has been clicked.
    var buttonEl = $(event.target);
    // Get the value from the textarea next to that button.
    var eventDescr = buttonEl.siblings('textarea').val();
    // Get the id name of that button's time-block to set it as the key in the local storage.
    var eventHour = buttonEl.parents().attr('id');

    localStorage.setItem(eventHour, eventDescr);
}

// Add event listener to save buttons in time-blocks;
schedulerList.on('click', '.save-btn', saveEvent);
//  When the page opens it loads the saved events onto scheduler.
getEvents();