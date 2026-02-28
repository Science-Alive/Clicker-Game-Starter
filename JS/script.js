// ==========================================
// 🎮 1. GAME STATE & CONFIGURATION 🎮
// ==========================================

// 🧠 HOW IT WORKS: This 'gameData' object is the brain of your game.
// It remembers everything from your score to how many upgrades you own!
const gameData = {
  score: 0,

  /* 📝 TODO: How many points do you get per click? Change this to make clicking stronger! */
  clickPower: 1,

  lastTick: Date.now(),

  // 📝 TODO: Customize your shop items!
  // ⚠️ IMPORTANT: The 'id' here MUST match the id in your HTML file!
  // Example: id: "auto1" connects to id="btn-auto1" in HTML.
  autoClickers: [
    {
      id: "auto1",
      cost: 15, // How much does the first one cost?
      rate: 1, // How many points per second does it give?
      count: 0, // How many does the player own right now? (Leave at 0)
    },
    {
      id: "auto2",
      cost: 50,
      rate: 5,
      count: 0,
    },
    {
      id: "auto3",
      cost: 250,
      rate: 10,
      count: 0,
    },
    // 📝 TODO: Add more upgrades here as your game gets bigger!
  ],
};

/* =========================================
   🚀 2. MAIN ENTRY POINT
   This runs once when the game first loads.
   ========================================= */
function main() {
  console.log("Game Starting...");

  // 📝 TODO: Step 1 - Find your main click button in the HTML using document.getElementById.
  // Then, add an event listener so that when it is clicked, it adds 'clickPower' to your 'score'!

  // 📝 TODO: Step 2 - Loop through your 'gameData.autoClickers' array.
  // For each item, find its button in the HTML and add a click event listener.
  // When clicked, it should run the buyAutoClicker() function for that specific item.

  // 🧠 HOW IT WORKS: This starts the game loop engine! We left this here so your passive points run smoothly.
  gameData.lastTick = Date.now();
  requestAnimationFrame(gameLoop);
}

/* =========================================
   ⚙️ 3. GAME ENGINE (The Loop)
   ========================================= */
function gameLoop() {
  // 🧠 HOW IT WORKS: "Delta Time" calculates exactly how many milliseconds have passed since the last frame.
  // We do this because fast computers run games faster than slow computers.
  // Using actual time makes the game fair for everyone!
  let currentTime = Date.now();
  let deltaTime = currentTime - gameData.lastTick;
  gameData.lastTick = currentTime;

  // Add passive points (Convert ms to seconds by dividing by 1000)
  gameData.score += calculatePPS() * (deltaTime / 1000);

  // Update Screen
  updateUI();

  // 🧠 HOW IT WORKS: requestAnimationFrame tells the browser: "Run this loop again right before you draw the next frame!"
  requestAnimationFrame(gameLoop);
}

/* =========================================
   🛠️ 4. HELPER FUNCTIONS
   ========================================= */

// Determines whether player has enough points to buy an auto clicker
function buyAutoClicker(autoClicker) {
  // 🧠 HOW IT WORKS: Uses if statement to determine if an auto clicker can be bought.
  if (gameData.score >= autoClicker.cost) {
    gameData.score -= autoClicker.cost;
    autoClicker.count++;
    autoClicker.cost = Math.ceil(autoClicker.cost * 1.2);
  }
}

// Calculates the point per second to show player how many points auto clickers are earning
function calculatePPS() {
  let pps = 0;
  // Look at every auto clicker we own, and multiply how many we have by how much they give!
  for (let i = 0; i < gameData.autoClickers.length; i++) {
    let item = gameData.autoClickers[i];
    pps += item.count * item.rate;
  }
  return pps;
}

function updateUI() {
  // 🧠 HOW IT WORKS: Math.floor chops off the decimal points.
  // So instead of seeing "10.453 points", you just see "10".
  document.getElementById("score").innerText = Math.floor(gameData.score);
  document.getElementById("pps").innerText = calculatePPS();

  // Update Shop Text and Buttons
  for (let i = 0; i < gameData.autoClickers.length; i++) {
    let autoClicker = gameData.autoClickers[i];

    let costSpan = document.getElementById("cost-" + autoClicker.id);
    let countSpan = document.getElementById("count-" + autoClicker.id);

    // Safely update the text if the HTML elements exist
    if (costSpan) costSpan.innerText = autoClicker.cost;
    if (countSpan) countSpan.innerText = autoClicker.count;

    // Check if we can afford the auto clicker to turn the button on or off
    let btn = document.getElementById("btn-" + autoClicker.id);
    if (btn) {
      if (gameData.score >= autoClicker.cost) {
        btn.disabled = false; // Enable clicking
        btn.style.opacity = "1.0"; // Make it fully visible
      } else {
        btn.disabled = true; // Disable clicking
        btn.style.opacity = "0.5"; // Make it see-through
      }
    }
  }
}

// =========================================
// 💾 5. SAVING & LOADING
// =========================================
function saveGame() {
  // 📝 TODO: Write the code to save your game! Follow these steps:
  // Step 1: Use JSON.stringify() to turn your 'gameData' object into a text string. Save it to a variable.
  // 🧠 WHY? LocalStorage (the browser's backpack) can only hold text strings, not Javascript objects!
  // Step 2: Use localStorage.setItem("myClickerGame", yourStringVariable) to save it to the browser.
}

function loadGame() {
  // 📝 TODO: Write the code to load your game! Follow these steps:
  // Step 1: Use localStorage.getItem("myClickerGame") to pull the text string out of the browser's backpack. Save it to a variable.
  // Step 2: Write an IF statement to check if the string is completely empty (null). If it is, just 'return' to exit the function early.
  // Step 3: If it's not empty, use JSON.parse() to turn that text string back into a real JavaScript object.
  // Step 4: Use Object.assign(gameData, yourParsedObject) to copy the saved stats back into your active game!
}

// 🔥 START THE GAME 🔥
// 🧠 HOW IT WORKS: This actually runs the main function we set up at the top!
main();
