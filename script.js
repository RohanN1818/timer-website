const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const progressBar = document.getElementById('progress');

let count = 0;
let intervalId = null;
const MAX_TIME = 30;

function updateDisplay(value) {
    timerDisplay.textContent = value;
    const percentage = (value / MAX_TIME) * 100;
    progressBar.style.width = `${percentage}%`;
}

function startTimer() {
    // Disable start, enable reset
    startBtn.disabled = true;
    resetBtn.disabled = false;

    // Reset if it was already at max
    if (count >= MAX_TIME) {
        count = 0;
        updateDisplay(count);
    }

    // Immediate update for better UX? No, start from 0 or 1? 
    // Request is count 1 to 30.
    // Let's increment first then display to show 1 immediately? 
    // Or start at 0 and go to 30. Usually timers start at 0.
    // "count a timer from 1 to 30" -> implied start at 1?
    // Let's start from 0 and go to 30.

    intervalId = setInterval(() => {
        count++;
        updateDisplay(count);

        if (count >= MAX_TIME) {
            clearInterval(intervalId);
            startBtn.disabled = false;
            startBtn.textContent = 'Restart';
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(intervalId);
    count = 0;
    updateDisplay(count);
    startBtn.disabled = false;
    resetBtn.disabled = true;
    startBtn.textContent = 'Start';
    progressBar.style.transition = 'width 0.3s ease'; // Quick reset
    setTimeout(() => {
        progressBar.style.transition = 'width 1s linear'; // Restore linear for counting
    }, 300);
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize
updateDisplay(0);
