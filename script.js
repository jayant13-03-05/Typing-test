const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const originalText = "JavaScript is a powerful language.";
let timeLeft = 60;
let timer;
let timerStarted = false;

input.addEventListener("input", () => {
  if (!timerStarted) {
    timerStarted = true;
    timer = setInterval(updateTimer, 1000);
  }

  const typedText = input.value;
  const wordsTyped = typedText.trim().split(/\s+/).filter(Boolean).length;
  const timeUsed = 60 - timeLeft;
  const wpm = timeUsed > 0 ? Math.round((wordsTyped / timeUsed) * 60) : 0;

  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === originalText[i]) {
      correctChars++;
    }
  }

  const accuracy = typedText.length > 0
    ? Math.round((correctChars / typedText.length) * 100)
    : 0;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy;
});

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
  } else {
    clearInterval(timer);
    input.disabled = true;
  }
}

function resetTest() {
  clearInterval(timer);
  timerStarted = false;
  timeLeft = 60;
  input.disabled = false;
  input.value = "";
  timeDisplay.textContent = 60;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 0;
}
