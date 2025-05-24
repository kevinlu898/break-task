// Upgrades list
const upgrades = [
  {
    name: "Upgrade 1",
    description: "Upgrade",
    cost: "100",
    effect: "effect1",
  },
];

// Chests list
const chests = [
  {
    name: "Jepordy",
    description:
      "You will recieve two times the coins when you complete a task, but lose the coins if you don't.",
    effect: () => {
      localStorage.setItem("jerpordy", true);
    },
  },
  {
    name: "Gain coins",
    description: "You've gained 1 coin!",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += 1
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Mystery Box",
    description: "Who knows what's inside?",
    effect: "effect4",
  },
  {
    name: "Ancient Relic",
    description: "An artifact from a forgotten time.",
    effect: "effect5",
  },
];

// Random chest daily
function chooseDailyChest() {
  const date = new Date();
  localStorage.setItem("lastDate", date.toISOString().split("T")[0]);
  const lastDate = localStorage.getItem("lastDate");
  if (date - lastDate > 86400000) {
    const randomIndex = Math.floor(Math.random() * chests.length);
    return chests[randomIndex];
  } else {
    return;
  }
}
function displayAlert(message) {
  // This function will display alert in the game UI
  console.log(message); // Replace with UI alert logic
}

function getDailyChest() {
  const todayChest = chooseDailyChest();
  alert(`Today's chest: ${todayChest.name} - ${todayChest.description}`);
  // Retrieve the random event and apply its effect
  const randomEventMessage = localStorage.getItem("randomEventMessage");
  const event = randomEvents.find((e) => e.description === randomEventMessage);
  if (event && typeof event.effect === "function") {
    event.effect();
  }
}

window.onload = function () {
  getDailyChest();
};
