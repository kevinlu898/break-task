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

function addTask(name) {
  const listrn = localStorage.getItem("tasks");
  localStorage.setItem("tasks", [...listrn, { name: name, id: id }]);
  const curid = localStorage.getItem("id");
  localStorage.setItem("id", curid + 1);
}
function removeTask(theid) {
  const listrn = localStorage.getItem("tasks");
  localStorage.setItem(
    "tasks",
    listrn.filter((x) => x.id != theid)
  );
}

// window.onload = () => {
//   if (localStorage.getItem("name") == null) {
//     window.location.href = "/intro.html";
//   }
// };
