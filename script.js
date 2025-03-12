// Horloge
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById("clock").textContent = timeString;
}

updateClock();
setInterval(updateClock, 1000);

// Calculatrice
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.rgb');

let currentExpression = '';
let lastResult = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('clear')) {
            currentExpression = '';
            lastResult = null;
            display.value = '';
            return;
        }

        if (button.classList.contains('operator') && value !== '=') {
            if (lastResult !== null && currentExpression === '') {
                currentExpression = lastResult + value;
            } else {
                currentExpression += value;
            }
            display.value = currentExpression;
            return;
        }

        if (value === '=') {
            try {
                const result = eval(currentExpression);
                display.value = result;
                currentExpression = '';
                lastResult = result;
            } catch (error) {
                display.value = 'Error';
                currentExpression = '';
                lastResult = null;
            }
            return;
        }

        if (lastResult !== null && !button.classList.contains('operator')) {
            currentExpression = value;
            lastResult = null;
        } else {
            currentExpression += value;
        }
        display.value = currentExpression;
    });
});
