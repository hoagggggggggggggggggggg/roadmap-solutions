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
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateDisplay() {
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
  updateDisplay();
  playSound();
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
      // Adjust remaining time after resuming
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
    switchSession();
    remainingTime = state.remainingTime;
    startTime = now;
  }

  updateDisplay();

  // Continue with requestAnimationFrame
  timer = requestAnimationFrame(runTimer);
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
  state.workDuration = parseInt(e.target.value) * 60 * 1000;
  if (sessionType === "Work") resetTimer();
});

shortBreakInput.addEventListener("change", (e) => {
  state.shortBreak = parseInt(e.target.value) * 60 * 1000;
});

longBreakInput.addEventListener("change", (e) => {
  state.longBreak = parseInt(e.target.value) * 60 * 1000;
});

// Initialize Display
updateDisplay();
