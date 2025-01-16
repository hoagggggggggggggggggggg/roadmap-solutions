// State Management
let timer = null;
let sessionType = "Work"; // Work, Short Break, Long Break
let workSessions = 0;
let isRunning = false;
let startTime = null; // Start time of the current session
let pauseTime = null; // Pause timestamp
let remainingTime = 25 * 60 * 1000; // Default work duration in milliseconds

const state = {
  workDuration: 25 * 60 * 1000, // in milliseconds
  shortBreak: 5 * 60 * 1000, // in milliseconds
  longBreak: 15 * 60 * 1000, // in milliseconds
};

// DOM Elements
const sessionTypeElement = document.getElementById("session-type");
const timeElement = document.getElementById("time");
const startStopButton = document.getElementById("start-stop");
const resetButton = document.getElementById("reset");
const workDurationInput = document.getElementById("work-duration");
const shortBreakInput = document.getElementById("short-break");
const longBreakInput = document.getElementById("long-break");
const workSessionsElement = document.getElementById("work-sessions");

// Functions
function formatTime(milliseconds) {
  if (isNaN(milliseconds) || milliseconds < 0) {
    console.error("Invalid time format:", milliseconds);
    return "00:00"; // Default value if time is invalid
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateDisplay() {
  console.log("Remaining Time (ms):", remainingTime);
  console.log("Session Type:", sessionType);

  if (remainingTime < 0 || isNaN(remainingTime)) {
    console.error("Error: remainingTime is invalid.");
    remainingTime = sessionType === "Work" ? state.workDuration : 
                    (sessionType === "Short Break" ? state.shortBreak : state.longBreak);
  }

  timeElement.textContent = formatTime(remainingTime);
  sessionTypeElement.textContent = sessionType;
}

function switchSession() {
  if (sessionType === "Work") {
    workSessions++;
    workSessionsElement.textContent = workSessions;
    sessionType = workSessions % 4 === 0 ? "Long Break" : "Short Break";
    remainingTime = sessionType === "Long Break" ? state.longBreak : state.shortBreak;
  } else {
    sessionType = "Work";
    remainingTime = state.workDuration;
  }

  console.log("Switched Session:", sessionType);
  console.log("New Remaining Time (ms):", remainingTime);

  stopTimer(); // Stop current timer before switching
  updateDisplay();
  playSound();
  startTimer(); // Start the timer for the next session
}

function playSound() {
  const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
  audio.play();
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now();
    if (pauseTime) {
      startTime -= pauseTime;
      pauseTime = null;
    }
    runTimer();
  }
}

function runTimer() {
  if (!isRunning) return;

  const now = Date.now();
  const elapsedTime = now - startTime;
  remainingTime -= elapsedTime;
  startTime = now;

  if (remainingTime <= 0) {
    cancelAnimationFrame(timer); // Stop the animation frame
    switchSession(); // Switch session when time runs out
  } else {
    updateDisplay();
    timer = requestAnimationFrame(runTimer);
  }
}

function stopTimer() {
  if (isRunning) {
    isRunning = false;
    pauseTime = Date.now() - startTime; // Store paused time
    cancelAnimationFrame(timer);
  }
}

function resetTimer() {
  stopTimer();
  sessionType = "Work";
  remainingTime = state.workDuration;
  workSessions = 0;
  workSessionsElement.textContent = workSessions;
  updateDisplay();
}

// Event Listeners
startStopButton.addEventListener("click", () => {
  if (isRunning) {
    stopTimer();
    startStopButton.textContent = "Start";
  } else {
    startTimer();
    startStopButton.textContent = "Stop";
  }
});

resetButton.addEventListener("click", () => {
  resetTimer();
  startStopButton.textContent = "Start";
});

workDurationInput.addEventListener("change", (e) => {
  const value = parseInt(e.target.value) * 60 * 1000;
  if (!isNaN(value) && value > 0) {
    state.workDuration = value;
    if (sessionType === "Work") resetTimer();
  } else {
    e.target.value = 25; // Default value
    alert("Invalid input. Please enter a valid number.");
  }
});

shortBreakInput.addEventListener("change", (e) => {
  const value = parseInt(e.target.value) * 60 * 1000;
  if (!isNaN(value) && value > 0) {
    state.shortBreak = value;
  } else {
    e.target.value = 5;
    alert("Invalid input. Please enter a valid number.");
  }
});

longBreakInput.addEventListener("change", (e) => {
  const value = parseInt(e.target.value) * 60 * 1000;
  if (!isNaN(value) && value > 0) {
    state.longBreak = value;
  } else {
    e.target.value = 15;
    alert("Invalid input. Please enter a valid number.");
  }
});

// Initialize Display
updateDisplay();
