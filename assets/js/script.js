// Set the variable for all <div> elements inside the container with hourly events.
var listContents = $('#scheduler > div');

// Add variables for time
var today = dayjs();
var hourNow = today.format('H');

// Checks if the document is ready and executes the funtions every second to refresh the clock, so the time is up to date and time-block colours are assigned right.
$(document).ready(function()
{
    function setTime() {
        
        var timeNow = today.format('MMMM D, YYYY h:mm a');
        $('#date-time').text(timeNow);
    }

    setInterval(function()
    {
        setTime();
        setColors();
    }, 1000); 
})




function setColors() {

    $.each(listContents, function() {
         // Set the variable to get the id name of each corresponding  time-block, which would be the relevant key value.
        var eventId = $(this).attr('id');
        // Use substring() method to extract the hour number only, it removes 'hour-' from each eventHour and then turn the string into a number.
        var eventHour = parseInt(eventId.substring(5));   

        // Use conditions to change class to past, present and future depending on the hourNow
        if ((eventHour > hourNow) && !$(this).hasClass('future')) {

            $(this).addClass('future');

            if ($(this).hasClass('past')) {
                $(this).removeClass('past');
            } 
            if ($(this).hasClass('present')) {
                $(this).removeClass('present');
            } 
        }

        if (eventHour == hourNow && !$(this).hasClass('present')) {

            $(this).addClass('present');

            if ($(this).hasClass('past')) {
                $(this).removeClass('past');
            } 
            if ($(this).hasClass('future')) {
                $(this).removeClass('future');
            } 
        }

        if (eventHour < hourNow && !$(this).hasClass('past')) {

            $(this).addClass('past');
            
            if ($(this).hasClass('present')) {
                $(this).removeClass('present');
            } 
            if ($(this).hasClass('future')) {
                $(this).removeClass('future');
            } 
        }
    })
    
}


// Render the event-descr from the local storage and 
function getEvents() {
    
    $.each(listContents, function() {
        
        // Set the variable to get the id name of each corresponding  time-block, which would be the relevant key value.
        var eventId = $(this).attr('id');

        // Render the saved event with that key value.
        var savedEvent = localStorage.getItem(eventId);
        // display them in the textareas of all the time-blocks.
        $(this).children('textarea').val(savedEvent);

    })
    
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
listContents.on('click', '.save-btn', saveEvent);
//  When the page opens it loads the saved events onto scheduler.
getEvents();