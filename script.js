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

function resetDefault() {
  localStorage.set("coins", 0);
  localStorage.set("level", 0);
  localStorage.set("xp", 0);
  localStorage.set("name", "");
  localStorage.set("tasks", []);
  localStorage.set("id", 0);
}

function render() {
  const thetasklist = document.getElementById("task_list");
  thetasklist.innerHTML = "";
  JSON.parse(localStorage.getItem("tasks")).forEach((element) => {
    if (!element.locked) {
    thetasklist.innerHTML += `
                <div class="task-item ${element.running ? 'running' : ''}" id="task-item-${element.id}">
                    <div class="task-content">
                        ${element.name}
                    </div>
                    <div class="task-widgets">
                        <p class="time-text">Time needed: ${element.time} minutes</p>
                        <div class="task-buttons">
                            <img class="svg-emblem" src="ass_ets/${element.running ? 'stop' : 'start_arrow'}.svg" alt="${element.running ? 'stop' : 'start'}" onclick="startTask(${element.id})"/>
                            <img class="svg-emblem" src="ass_ets/unlock.svg" alt="unlock" onclick="lockTask(${element.id})"/>
                            <img class="svg-emblem" src="ass_ets/close-x.svg" alt="Remove" onclick="removeTask(${element.id})"/>
                        </div>
                    </div>
                </div>`;
    } else {
      thetasklist.innerHTML += `
                <div class="task-item ${element.running ? 'running' : ''}" id="task-item-${element.id}">
                    <div class="task-content">
                        ${element.name}
                    </div>
                    <div class="task-widgets">
                        <p class="time-text">Time needed: ${element.time} minutes</p>
                        <div class="task-buttons">
                            <img class="svg-emblem" src="ass_ets/${element.running ? 'stop' : 'start_arrow'}.svg" alt="${element.running ? 'stop' : 'start'}" onclick="startTask(${element.id})"/>
                            <img class="svg-emblem" src="ass_ets/lock.svg" alt="lock" onclick="lockTask(${element.id})"/>
                            <img class="svg-emblem" src="ass_ets/close-x.svg" alt="Remove" onclick="removeTask(${element.id})"/>
                        </div>
                    </div>
                </div>`;
    }
  });
}

function addTask(name, time) {
  if (!name || !time) return; // Don't add if name or time is missing
  
  const listrn = JSON.parse(localStorage.getItem("tasks"));
  localStorage.setItem(
    "tasks",
    JSON.stringify([...listrn, { name: name, id: localStorage.getItem("id"), locked: false, time: time, running: false}])
  );
  const curid = Number(localStorage.getItem("id"));
  localStorage.setItem("id", curid + 1);
  render();
  closeAddTaskPopup(); // Close the popup after adding
}

function removeTask(theid) {
  // Find the task element
  const taskElement = document.querySelector(`[onclick="removeTask(${theid})"]`).closest('.task-item');
  
  // Add the closing class to trigger the animation
  taskElement.classList.add('closing');
  
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
  localStorage.setItem("tasks", JSON.stringify(listrn.map(x => x.id == theid ? {...x, locked: !x.locked} : x)));
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

function startTask(theid) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  
  // Update tasks: toggle the clicked task and stop any other running tasks
  tasks.forEach(task => {
    if (task.id == theid) {
      task.running = !task.running;
    } else if (task.running) {
      task.running = false;
    }
  });
  
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

window.onload = () => {
  localStorage.setItem("tasks", "[]");
  localStorage.setItem("id", 0);
  
  // Add event listener for the Create Task button
  const createTaskButton = document.getElementById("create_task_button");
  createTaskButton.addEventListener("click", openAddTaskPopup);
  
  // Add event listener for the add task button
  const addTaskButton = document.getElementById("add_task_popup_button");
  addTaskButton.addEventListener("click", () => {
    const nameInput = document.querySelector("#add_task_input[type='text']");
    const timeInput = document.querySelector("#add_task_input[type='number']");
    
    if (nameInput && timeInput) {
      addTask(nameInput.value, parseInt(timeInput.value));
      // Clear inputs after adding
      nameInput.value = "";
      timeInput.value = "";
    }
  });

  // Add event listener for the close button
  const closeButton = document.querySelector("#add_task_popup_close_button img");
  if (closeButton) {
    closeButton.addEventListener("click", closeAddTaskPopup);
  }

  // Add event listener for the X in the corner
  const cornerCloseButton = document.querySelector("#add_task_popup_cancel_button");
  if (cornerCloseButton) {
    cornerCloseButton.addEventListener("click", closeAddTaskPopup);
  }

  addTask("💀", 10);
  addTask("hi", 10);
};
