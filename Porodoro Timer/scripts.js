// State Management
let timer = null;
let sessionType = "Work"; // Work, Short Break, Long Break
let workSessions = 0;

const state = {
  workDuration: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  remainingTime: 25 * 60,
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
function updateDisplay() {
  const minutes = Math.floor(state.remainingTime / 60);
  const seconds = state.remainingTime % 60;
  timeElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  sessionTypeElement.textContent = sessionType;
}

function switchSession() {
  if (sessionType === "Work") {
    workSessions++;
    workSessionsElement.textContent = workSessions;
    sessionType = workSessions % 4 === 0 ? "Long Break" : "Short Break";
    state.remainingTime = sessionType === "Long Break" ? state.longBreak : state.shortBreak;
  } else {
    sessionType = "Work";
    state.remainingTime = state.workDuration;
  }
  updateDisplay();
  playSound();
}

function playSound() {
  const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
  audio.play();
}

function startTimer() {
  timer = setInterval(() => {
    state.remainingTime--;
    updateDisplay();
    if (state.remainingTime <= 0) {
      clearInterval(timer);
      switchSession();
      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  stopTimer();
  sessionType = "Work";
  state.remainingTime = state.workDuration;
  workSessions = 0;
  workSessionsElement.textContent = workSessions;
  updateDisplay();
}

// Event Listeners
startStopButton.addEventListener("click", () => {
  if (timer) {
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
  state.workDuration = parseInt(e.target.value) * 60;
  if (sessionType === "Work") resetTimer();
});

shortBreakInput.addEventListener("change", (e) => {
  state.shortBreak = parseInt(e.target.value) * 60;
});

longBreakInput.addEventListener("change", (e) => {
  state.longBreak = parseInt(e.target.value) * 60;
});

// Initialize Display
updateDisplay();
