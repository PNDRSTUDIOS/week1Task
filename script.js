// Day 1: JavaScript Wiring

// 1. Select the form element using its ID
const taskForm = document.getElementById('task-form');

// 2. Attach an event listener that waits for the user to click "Submit"
taskForm.addEventListener('submit', function(event) {
    
    // Stop the browser from attempting to send data and refreshing the page
    event.preventDefault();
    
    // 3. Print a message to the console to prove our button works
    console.log("Success! The form was submitted without refreshing the page.");
    console.log("We are ready to start capturing data and building tasks on Day 2!");
    
});