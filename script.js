/*
Database you seek?
Only empty dreams remain
Local storage rules
*/

/*
localstorage:
name -> the character's name
coins -> number of coins
level -> the level your character is at
xp -> the xp your character has towards the next level.
tasks -> the list of tasks that have been created.
id -> id for making new tasks
*/

let activeTimer = null;
let breakTimeTimer = null;

// Add page detection at the start
const isBreaksPage = window.location.pathname.includes("breaks.html");

function formatTime(seconds) {
  // Round to nearest second to avoid floating point issues
  seconds = Math.round(seconds);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function updateTaskTimer(taskId) {
  const taskElement = document.getElementById(`task-item-${taskId}`);
  if (!taskElement) return;

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find((t) => t.id == taskId);
  if (!task || !task.running) return;

  const now = Date.now();
  const remainingTime = Math.max(0, (task.endTime - now) / 1000); // Convert to seconds
  const timeText = taskElement.querySelector(".time-text");
  timeText.textContent = `Time remaining: ${formatTime(remainingTime)}`;

  // If task is complete, handle completion
  if (remainingTime <= 0) {
    completeTask(taskId);
  }
}

function updateStats() {
  const coins = Math.round(Number(localStorage.getItem("coins") || 0));
  const breakTime = Number(localStorage.getItem("breakTime") || 0);

  // Update coins display
  const coinsDisplay = document.querySelector(".flex-container p");
  if (coinsDisplay) {
    coinsDisplay.textContent = `${coins} coins`;
  }

  // Update break time display
  const breakTimeDisplay = document.querySelector("#points-container p");
  if (breakTimeDisplay) {
    // Round to avoid floating point issues
    const roundedBreakTime = Math.round(breakTime * 60) / 60; // Round to nearest second
    const minutes = Math.floor(Math.abs(roundedBreakTime));
    const seconds = Math.floor((Math.abs(roundedBreakTime) - minutes) * 60);
    const displayText =
      roundedBreakTime < 0
        ? `Break time: -${minutes}:${seconds
            .toString()
            .padStart(2, "0")} (${Math.abs(
            Math.round(roundedBreakTime)
          )} coins debt)`
        : `Break time: ${minutes}:${seconds.toString().padStart(2, "0")}`;
    breakTimeDisplay.textContent = displayText;
  }
}

function completeTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find((t) => t.id == taskId);
  if (!task) return;

  // Grant coins (1 coin per minute)
  const coins = Math.round(Number(localStorage.getItem("coins") || 0));
  const minutes = Math.ceil(task.time / 60);
  localStorage.setItem("coins", coins + minutes);

  // Remove the task
  const updatedTasks = tasks.filter((t) => t.id != taskId);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  // Clear timer
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }

  render();
  updateStats(); // Update stats after completing task
}

function resetDefault() {
  localStorage.setItem("coins", 1000);
  localStorage.setItem("breakTime", 0);
  localStorage.setItem("level", 0);
  localStorage.setItem("xp", 0);
  localStorage.setItem("name", "");
  localStorage.setItem("tasks", "[]");
  localStorage.setItem("id", 0);
}

function render() {
  const thetasklist = document.getElementById("task_list");
  thetasklist.innerHTML = "";
  JSON.parse(localStorage.getItem("tasks")).forEach((element) => {
    const isCompleted =
      element.running && element.endTime && Date.now() >= element.endTime;
    const taskClass = isCompleted
      ? "task-item completed"
      : element.running
      ? "task-item running"
      : "task-item";

    // Calculate remaining time for display
    let timeDisplay;
    if (element.running && element.endTime) {
      const remainingTime = Math.max(0, (element.endTime - Date.now()) / 1000);
      timeDisplay = `Time remaining: ${formatTime(remainingTime)}`;
    } else {
      timeDisplay = `Time needed: ${element.time} minutes`;
    }

    if (!element.locked) {
      thetasklist.innerHTML += `
                <div class="${taskClass}" id="task-item-${element.id}">
                    <div class="task-content">
                        ${element.name}
                    </div>
                    <div class="task-widgets">
                        <p class="time-text">${timeDisplay}</p>
                        <div class="task-buttons">
                            ${
                              isCompleted
                                ? `<img class="svg-emblem" src="ass_ets/end_started_task_symbol.svg" alt="complete" onclick="completeTask(${element.id})"/>`
                                : `<img class="svg-emblem" src="ass_ets/${
                                    element.running ? "stop" : "start_arrow"
                                  }.svg" alt="${
                                    element.running ? "stop" : "start"
                                  }" onclick="startTask(${element.id})"/>`
                            }
                            <img class="svg-emblem" src="ass_ets/unlock.svg" alt="unlock" onclick="lockTask(${
                              element.id
                            })"/>
                            <img class="svg-emblem" src="ass_ets/close-x.svg" alt="Remove" onclick="removeTask(${
                              element.id
                            })"/>
                        </div>
                    </div>
                </div>`;
    } else {
      thetasklist.innerHTML += `
                <div class="${taskClass}" id="task-item-${element.id}">
                    <div class="task-content">
                        ${element.name}
                    </div>
                    <div class="task-widgets">
                        <p class="time-text">${timeDisplay}</p>
                        <div class="task-buttons">
                            ${
                              isCompleted
                                ? `<img class="svg-emblem" src="ass_ets/end_started_task_symbol.svg" alt="complete" onclick="completeTask(${element.id})"/>`
                                : `<img class="svg-emblem" src="ass_ets/${
                                    element.running ? "stop" : "start_arrow"
                                  }.svg" alt="${
                                    element.running ? "stop" : "start"
                                  }" onclick="startTask(${element.id})"/>`
                            }
                            <img class="svg-emblem" src="ass_ets/lock.svg" alt="lock" onclick="lockTask(${
                              element.id
                            })"/>
                            <img class="svg-emblem" src="ass_ets/close-x.svg" alt="Remove" onclick="removeTask(${
                              element.id
                            })"/>
                        </div>
                    </div>
                </div>`;
    }
  });
}

function addTask(name, time) {
  if (!name || !time) return; // Don't add if name or time is missing

  const listrn = JSON.parse(localStorage.getItem("tasks") || "[]");
  const curid = Number(localStorage.getItem("id") || 0);

  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...listrn,
      {
        name: name,
        id: curid,
        locked: false,
        time: time,
        originalTime: time, // Store original time for coin calculation
        running: false,
        lastUpdate: Date.now(),
      },
    ])
  );

  localStorage.setItem("id", curid + 1);
  render();
  closeAddTaskPopup(); // Close the popup after adding
}

function removeTask(theid) {
  // Find the task element
  const taskElement = document
    .querySelector(`[onclick="removeTask(${theid})"]`)
    .closest(".task-item");

  // Add the closing class to trigger the animation
  taskElement.classList.add("closing");

  // Wait for the animation to complete before removing the task
  setTimeout(() => {
    const listrn = JSON.parse(localStorage.getItem("tasks"));
    localStorage.setItem(
      "tasks",
      JSON.stringify(listrn.filter((x) => x.id != theid))
    );
    render();
  }, 300); // 300ms matches the animation duration
}

function lockTask(theid) {
  const listrn = JSON.parse(localStorage.getItem("tasks"));
  localStorage.setItem(
    "tasks",
    JSON.stringify(
      listrn.map((x) => (x.id == theid ? { ...x, locked: !x.locked } : x))
    )
  );
  render();
}

function openAddTaskPopup() {
  const addTaskPopup = document.getElementById("add_task_popup");
  const overlay = document.getElementById("add_task_popup_overlay");
  addTaskPopup.style.display = "block";
  overlay.style.display = "block";
}

function closeAddTaskPopup() {
  const addTaskPopup = document.getElementById("add_task_popup");
  const overlay = document.getElementById("add_task_popup_overlay");
  addTaskPopup.style.display = "none";
  overlay.style.display = "none";
}

function startBreakTimeTimer() {
  if (breakTimeTimer) return; // Don't start if already running

  breakTimeTimer = setInterval(() => {
    const breakTime = Number(localStorage.getItem("breakTime") || 0);
    const coins = Math.round(Number(localStorage.getItem("coins") || 0));

    // Decrease break time by 1/60th of a minute (1 second)
    const newBreakTime = Math.round((breakTime - 1 / 60) * 60) / 60; // Round to nearest second
    localStorage.setItem("breakTime", newBreakTime);

    // If break time goes negative, deduct coins every minute
    if (newBreakTime < 0) {
      // Calculate how many coins to deduct (1 coin per minute of debt)
      const debtAmount = Math.abs(Math.floor(newBreakTime));
      if (coins > 0) {
        // Deduct all available coins up to the debt amount
        const deduction = Math.min(coins, debtAmount);
        localStorage.setItem("coins", coins - deduction);
        // Reduce the debt by the amount deducted
        localStorage.setItem("breakTime", newBreakTime + deduction / 60);
      }
    }

    updateStats();
  }, 1000); // Run every second
}

function stopBreakTimeTimer() {
  if (breakTimeTimer) {
    clearInterval(breakTimeTimer);
    breakTimeTimer = null;
  }
}

function startTask(theid) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find((t) => t.id == theid);

  if (!task) return;

  // If task is locked, redirect to locked.html
  if (task.locked) {
    window.location.href = `locked.html?name=${encodeURIComponent(
      task.name
    )}&time=${task.time}`;
    return;
  }

  // Clear any existing timer
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }

  // Stop break time timer when starting a task
  stopBreakTimeTimer();

  // Update tasks: toggle the clicked task and stop any other running tasks
  tasks.forEach((t) => {
    if (t.id == theid) {
      t.running = !t.running;
      if (t.running) {
        // Store start and end times
        const now = Date.now();
        t.startTime = now;
        t.endTime = now + t.time * 60 * 1000; // Convert minutes to milliseconds

        // Start timer
        activeTimer = setInterval(() => {
          updateTaskTimer(theid);
        }, 1000);
      } else {
        // Start break time timer when task is stopped
        startBreakTimeTimer();
      }
    } else if (t.running) {
      t.running = false;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

// Add this function to check task states
function checkTaskStates() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  let tasksUpdated = false;

  tasks.forEach((task) => {
    if (task.running && task.endTime) {
      const now = Date.now();
      const remainingTime = Math.max(0, (task.endTime - now) / 1000); // Convert to seconds

      // If task is complete, grant coins
      if (remainingTime <= 0) {
        const coins = Math.round(Number(localStorage.getItem("coins") || 0));
        const minutes = Math.ceil(task.originalTime / 60);
        localStorage.setItem("coins", coins + minutes);
        task.running = false;
        tasksUpdated = true;
      }
    }
  });

  if (tasksUpdated) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
  }
}

window.onload = () => {
  // Only initialize if not already set
  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", "[]");
  }
  if (!localStorage.getItem("id")) {
    localStorage.setItem("id", 0);
  }

  // Check task states when loading the page
  checkTaskStates();

  // Get current tasks
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  // Clear any existing timers
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }
  if (breakTimeTimer) {
    clearInterval(breakTimeTimer);
    breakTimeTimer = null;
  }

  // Start appropriate timer based on task state
  if (!tasks.some((task) => task.running)) {
    startBreakTimeTimer();
  } else {
    // Restart timer for any running tasks
    tasks.forEach((task) => {
      if (task.running && task.endTime) {
        activeTimer = setInterval(() => {
          updateTaskTimer(task.id);
        }, 1000);
      }
    });
  }

  // Only initialize task-related elements if we're on the main page
  if (!isBreaksPage) {
    // Add event listener for the Create Task button
    const createTaskButton = document.getElementById("create_task_button");
    if (createTaskButton) {
      createTaskButton.addEventListener("click", openAddTaskPopup);
    }

    // Add event listener for the add task button
    const addTaskButton = document.getElementById("add_task_popup_button");
    if (addTaskButton) {
      addTaskButton.addEventListener("click", () => {
        const nameInput = document.querySelector(
          "#add_task_input[type='text']"
        );
        const timeInput = document.querySelector(
          "#add_task_input[type='number']"
        );

        if (nameInput && timeInput) {
          addTask(nameInput.value, parseInt(timeInput.value));
          // Clear inputs after adding
          nameInput.value = "";
          timeInput.value = "";
        }
      });
    }

    // Add event listener for the close button
    const closeButton = document.querySelector(
      "#add_task_popup_close_button img"
    );
    if (closeButton) {
      closeButton.addEventListener("click", closeAddTaskPopup);
    }

    // Add event listener for the X in the corner
    const cornerCloseButton = document.querySelector(
      "#add_task_popup_cancel_button"
    );
    if (cornerCloseButton) {
      cornerCloseButton.addEventListener("click", closeAddTaskPopup);
    }

    // Initial render of tasks
    render();
  }

  // Initial stats update (needed on both pages)
  updateStats();
};
