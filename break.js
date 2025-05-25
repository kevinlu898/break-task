// Upgrades list
const upgrades = [
  {
    name: "10 Minute Break",
    description: "Feeling tired? Buy a break with coins!",
    cost: 5,
    id: 0,
    effect: () => {
      const coins = Math.round(Number(localStorage.getItem("coins") || 0));
      if (coins - 5 >= 0) {
        localStorage.setItem("coins", coins - 5);
        const currentBreakTime = Number(localStorage.getItem("breakTime") || 0);
        localStorage.setItem(
          "breakTime",
          Math.round((currentBreakTime + 10) * 60) / 60
        );
        updateStats();
        alert("Purchased!");
      } else {
        alert("You don't have enough coins to purchase! Try again later.");
      }
    },
  },
  {
    name: "30 Minute Break",
    description: "Feeling tired? Buy a break with coins!",
    cost: 15,
    id: 1,
    effect: () => {
      const coins = Math.round(Number(localStorage.getItem("coins") || 0));
      if (coins - 15 >= 0) {
        localStorage.setItem("coins", coins - 15);
        const currentBreakTime = Number(localStorage.getItem("breakTime") || 0);
        localStorage.setItem(
          "breakTime",
          Math.round((currentBreakTime + 30) * 60) / 60
        );
        updateStats();
        alert("Purchased!");
      } else {
        alert("You don't have enough coins to purchase! Try again later.");
      }
    },
  },
];

// Chests list
const chests = [
  {
    name: "Jeopardy",
    description:
      "You will receive two times the coins when you complete a task, but lose the coins if you don't.",
    effect: () => {
      localStorage.setItem("jeopardy", true);
    },
  },
  {
    name: "Gain 1 coin",
    description: "You've gained 1 coin!",
    effect: () => {
      const coins = Number(localStorage.getItem("coins") || 0);
      localStorage.setItem("coins", coins + 1);
      updateStats();
    },
  },
  {
    name: "Gain 2 coins",
    description: "You've gained 2 coins!",
    effect: () => {
      const coins = Number(localStorage.getItem("coins") || 0);
      localStorage.setItem("coins", coins + 2);
      updateStats();
    },
  },
  {
    name: "Gain 3 coins",
    description: "You've gained 3 coins!",
    effect: () => {
      const coins = Number(localStorage.getItem("coins") || 0);
      localStorage.setItem("coins", coins + 3);
      updateStats();
    },
  },
  {
    name: "Gain 4 coins",
    description: "You've gained 4 coins!",
    effect: () => {
      const coins = Number(localStorage.getItem("coins") || 0);
      localStorage.setItem("coins", coins + 4);
      updateStats();
    },
  },
  {
    name: "Gain 5 coins",
    description: "You've gained 5 coins!",
    effect: () => {
      const coins = Number(localStorage.getItem("coins") || 0);
      localStorage.setItem("coins", coins + 5);
      updateStats();
    },
  },
  {
    name: "Gain 6 coins",
    description: "You've gained 6 coins!",
    effect: () => {
      const coins = Number(localStorage.getItem("coins") || 0);
      localStorage.setItem("coins", coins + 6);
      updateStats();
    },
  },
  {
    name: "Gain 7 coins",
    description: "You've gained 7 coins!",
    effect: () => {
      const coins = Number(localStorage.getItem("coins") || 0);
      localStorage.setItem("coins", coins + 7);
      updateStats();
    },
  },
  {
    name: "Gain 8 coins",
    description: "You've gained 8 coins!",
    effect: () => {
      const coins = Number(localStorage.getItem("coins") || 0);
      localStorage.setItem("coins", coins + 8);
      updateStats();
    },
  },
  {
    name: "Gain 9 coins",
    description: "You've gained 9 coins!",
    effect: () => {
      const coins = Number(localStorage.getItem("coins") || 0);
      localStorage.setItem("coins", coins + 9);
      updateStats();
    },
  },
  {
    name: "Gain 10 coins",
    description: "You've gained 10 coins!",
    effect: () => {
      const coins = Number(localStorage.getItem("coins") || 0);
      localStorage.setItem("coins", coins + 10);
      updateStats();
    },
  },
  {
    name: "Coins Boost",
    description: "Coins increase by 1.3x",
    effect: () => {
      const coins = Math.round(Number(localStorage.getItem("coins") || 0));
      localStorage.setItem("coins", Math.round(coins * 1.3));
      updateStats();
    },
  },
  {
    name: "Coins Boost",
    description: "Coins increase by 1.5x",
    effect: () => {
      const coins = Math.round(Number(localStorage.getItem("coins") || 0));
      localStorage.setItem("coins", Math.round(coins * 1.5));
      updateStats();
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

// Function to get the daily chest and apply its effect
function getDailyChest() {
  const todayChestIndex = Math.floor(Math.random() * chests.length);
  const todayChest = chests[todayChestIndex];
  localStorage.setItem("lastChest", todayChest.name);
  alert(`Today's chest: ${todayChest.name} - ${todayChest.description}`);
  if (todayChest.effect && typeof todayChest.effect === "function") {
    todayChest.effect();
  }
}

function doStuff(id) {
  upgrades[id].effect();
}

// Add updateStats function to match script.js
function updateStats() {
  const coins = Math.round(Number(localStorage.getItem("coins") || 0));
  const breakTime = Number(localStorage.getItem("breakTime") || 0);

  // Update coins display - handle both pages
  const coinsDisplays = document.querySelectorAll(".flex-container p");
  coinsDisplays.forEach((display) => {
    if (display && display.textContent.includes("Coins:")) {
      display.textContent = `Coins: ${coins}`;
    }
  });

  // Update break time display - handle both pages
  const breakTimeDisplays = document.querySelectorAll("#points-container p");
  breakTimeDisplays.forEach((display) => {
    if (display && display.textContent.includes("Break time:")) {
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
      display.textContent = displayText;
    }
  });
}

// Add break time timer handling
let breakTimeTimerBreak = null;

function startBreakTimeTimer() {
  if (breakTimeTimerBreak) return; // Don't start if already running

  breakTimeTimerBreak = setInterval(() => {
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
  if (breakTimeTimerBreak) {
    clearInterval(breakTimeTimerBreak);
    breakTimeTimerBreak = null;
  }
}

// Add task state checking function
function checkTaskStates() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  let tasksUpdated = false;

  tasks.forEach((task) => {
    if (task.running) {
      // Calculate time passed since last update
      const now = Date.now();
      const lastUpdate = task.lastUpdate || now;
      const timePassed = (now - lastUpdate) / 1000; // Convert to seconds

      // Update remaining time
      task.time = Math.max(0, task.time - timePassed / 60); // Convert seconds to minutes

      // If task is complete, grant coins
      if (task.time <= 0) {
        const coins = Number(localStorage.getItem("coins") || 0);
        const minutes = Math.ceil(task.originalTime / 60);
        localStorage.setItem("coins", coins + minutes);
        task.running = false;
        tasksUpdated = true;
      } else {
        task.lastUpdate = now;
        tasksUpdated = true;
      }
    }
  });

  if (tasksUpdated) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Initialize the page
function initializePage() {
  console.log("Initializing page...");
  setChests();

  // Clear and initialize the upgrade container
  const upgradeContainer = document.getElementById("upgradecont");
  console.log("Upgrade container found:", upgradeContainer);

  if (upgradeContainer) {
    console.log("Rendering upgrades...");
    upgradeContainer.innerHTML = ""; // Clear existing content
    upgrades.forEach((x) => {
      console.log("Rendering upgrade:", x.name);
      upgradeContainer.innerHTML += `
        <div class="upgrade" onclick="doStuff(${x.id})">
          <h2>${x.name}</h2>
          <p>${x.description}</p>
          <p>Cost: ${x.cost} coins</p>
        </div>`;
    });
    console.log("Finished rendering upgrades");
  } else {
    console.error("Upgrade container not found!");
  }

  // Check task states when loading the page
  checkTaskStates();

  // Get current tasks
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  // Clear any existing timers
  if (breakTimeTimerBreak) {
    clearInterval(breakTimeTimerBreak);
    breakTimeTimerBreak = null;
  }

  // Start break time timer if no tasks are running
  if (!tasks.some((task) => task.running)) {
    startBreakTimeTimer();
  }

  updateStats();
}

// Wait for both scripts to load and DOM to be ready
console.log("Document ready state:", document.readyState);
if (document.readyState === "loading") {
  console.log("Document still loading, waiting for DOMContentLoaded...");
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded fired");
    initializePage();
  });
} else {
  console.log("Document already loaded, initializing immediately");
  initializePage();
}

// Also try window.onload as a backup
window.addEventListener("load", () => {
  console.log("Window load event fired");
  // Only initialize if the container is still empty
  const upgradeContainer = document.getElementById("upgradecont");
  if (upgradeContainer && !upgradeContainer.children.length) {
    console.log("Container is empty, reinitializing...");
    initializePage();
  }
});

// Clear the value of lastChest at midnight
function clearLastChestAtMidnight() {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  const timeUntilMidnight = midnight - now;

  setTimeout(() => {
    localStorage.removeItem("lastChest");
    clearLastChestAtMidnight(); // Set up for next midnight
  }, timeUntilMidnight);
}

// Start the midnight check
clearLastChestAtMidnight();
