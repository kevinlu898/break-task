function timeToCoin(minutes) {
  return Math.pow(1.01, minutes) * 2;
}

function timetoXP(minutes) {
  return Math.pow(1.02, minutes) * 10;
}

function XPtoLevelUp(level) {
  return Math.pow(2, level) * 100;
}

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
                <div class="task-item">
                    ${element.name}
                    <div class="emblem-container justify-right">
                      <div class="emblem-container-inner">
                        <p class="time-text">Time needed: ${element.time} minutes</p>
                        <img class="svg-emblem" src="ass_ets/start_arrow.svg" alt="start"/>
                        <img class="svg-emblem" src="ass_ets/unlock.svg" alt="unlock" onclick="lockTask(${element.id})"/>
                        <img class="svg-emblem" src="ass_ets/close-x.svg" alt="Remove" onclick="removeTask(${element.id})"/>
                    </div>
                </div> `;
    } else {
      thetasklist.innerHTML += `
                <div class="task-item">
                    ${element.name}
                    <div class="emblem-container justify-right">
                      <div class="emblem-container-inner">
                        <p class="time-text">Time needed: ${element.time} minutes</p>
                        <img class="svg-emblem" src="ass_ets/start_arrow.svg" alt="start"/>
                        <img class="svg-emblem" src="ass_ets/lock.svg" alt="lock" onclick="lockTask(${element.id})"/>
                        <img class="svg-emblem" src="ass_ets/close-x.svg" alt="Remove" onclick="removeTask(${element.id})"/>
                    </div>
                </div> `;
    }
  });
}

function addTask(name) {
  const listrn = JSON.parse(localStorage.getItem("tasks"));
  localStorage.setItem(
    "tasks",
    JSON.stringify([...listrn, { name: name, id: localStorage.getItem`id`, locked: false, time: 0}])
  );
  const curid = Number(localStorage.getItem("id"));
  localStorage.setItem("id", curid + 1);
  render();
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

window.onload = () => {
  localStorage.setItem("tasks", "[]");
  localStorage.setItem("id", 0);
  // if (localStorage.getItem("name") == null) {
  //   window.location.href = "/intro.html";
  // }

  addTask("💀");
  addTask("hi");
};
