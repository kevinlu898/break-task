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
    name: "Gain 1 coin",
    description: "You've gained 1 coin!",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += 1;
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Gain 2 coins",
    description: "You've gained 2 coins!",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += 2;
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Gain 3 coins",
    description: "You've gained 3 coins!",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += 3;
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Gain 4 coins",
    description: "You've gained 4 coins!",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += 4;
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Gain 5 coins",
    description: "You've gained 5 coins!",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += 5;
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Gain 6 coins",
    description: "You've gained 6 coins!",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += 6;
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Gain 7 coins",
    description: "You've gained 7 coins!",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += 7;
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Gain 8 coins",
    description: "You've gained 8 coins!",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += 8;
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Gain 9 coins",
    description: "You've gained 9 coins!",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += 9;
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Gain 10 coins",
    description: "You've gained 10 coins!",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += 10;
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Coins Boost",
    description: "Coins increase by 1.3x",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += coins * 0.3;
        localStorage.setItem("coins", coins);
    },
  },
  {
    name: "Coins Boost",
    description: "Coins increase by 1.5x",
    effect: () => {
        const coins = localStorage.getItem("coins");
        coins += coins * 0.5;
        localStorage.setItem("coins", coins);
    },
  },
];


// If no Last Date, default date to zero
function setChests() {
if (!localStorage.getItem("lastChest")) {
    getDailyChest();
}
}

function displayAlert(message) {
  // This function will display alert in the game UI
  console.log(message); // Replace with UI alert logic
}

function getDailyChest() {
  const todayChest = Math.floor(Math.random() * chests.length);
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
