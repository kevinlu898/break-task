let taskTimer = null;
let taskEndTime = null;
let taskName = '';
let taskTime = 0;
let hasFailed = false;

function formatTime(seconds) {
    // Round to nearest second to avoid floating point issues
    seconds = Math.round(seconds);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    const now = Date.now();
    // Round to nearest second to avoid floating point issues
    const remainingTime = Math.round((taskEndTime - now) / 1000);
    document.getElementById('timer').textContent = formatTime(Math.max(0, remainingTime));

    if (remainingTime <= 0) {
        completeTask();
    }
}

function failTask() {
    if (hasFailed) return; // Prevent multiple failures
    hasFailed = true;
    
    // Clear the timer
    if (taskTimer) {
        clearInterval(taskTimer);
        taskTimer = null;
    }
    
    // Remove event listeners
    removeEventListeners();
    
    // Show failure message
    alert('Task failed! You moved or pressed a key.');
    
    // Return to main page
    window.location.href = 'index.html';
}

function completeTask() {
    if (hasFailed) return; // Don't complete if already failed
    
    // Clear the timer
    if (taskTimer) {
        clearInterval(taskTimer);
        taskTimer = null;
    }
    
    // Remove event listeners
    removeEventListeners();
    
    // Calculate points (1.5 points per minute)
    const points = Math.round(taskTime * 1.5);
    
    // Update coins
    const currentCoins = Number(localStorage.getItem('coins') || 0);
    localStorage.setItem('coins', currentCoins + points);
    
    // Remove the task from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.filter(t => t.name !== taskName);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
    // Show success message
    alert(`Task completed! You earned ${points} coins!`);
    
    // Return to main page
    window.location.href = 'index.html';
}

function addEventListeners() {
    // Mouse movement
    document.addEventListener('mousemove', failTask);
    // Mouse clicks
    document.addEventListener('click', failTask);
    // Keyboard input
    document.addEventListener('keydown', failTask);
    // Touch events
    document.addEventListener('touchstart', failTask);
    document.addEventListener('touchmove', failTask);
}

function removeEventListeners() {
    document.removeEventListener('mousemove', failTask);
    document.removeEventListener('click', failTask);
    document.removeEventListener('keydown', failTask);
    document.removeEventListener('touchstart', failTask);
    document.removeEventListener('touchmove', failTask);
}

window.onload = function() {
    // Get task info from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    taskName = urlParams.get('name') || 'Unknown Task';
    taskTime = Number(urlParams.get('time')) || 0;
    
    // Update task name display
    document.getElementById('taskName').textContent = taskName;
    
    // Set up timer
    taskEndTime = Date.now() + (taskTime * 60 * 1000); // Convert minutes to milliseconds
    taskTimer = setInterval(updateTimer, 1000);
    
    // Add event listeners
    addEventListeners();
    
    // Initial timer update
    updateTimer();
}; 