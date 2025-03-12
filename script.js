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

let currentInput = '';
let operator = '';
let firstOperand = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('clear')) {
            currentInput = '';
            operator = '';
            firstOperand = '';
            display.value = '';
            return;
        }

        if (button.classList.contains('operator') && value !== '=') {
            if (currentInput !== '') {
                firstOperand = currentInput;
                currentInput = '';
                operator = value;
            }
            return;
        }

        if (value === '=') {
            if (firstOperand && operator && currentInput) {
                const result = calculate(parseFloat(firstOperand), parseFloat(currentInput), operator);
                display.value = result;
                currentInput = result;
                firstOperand = '';
                operator = '';
            }
            return;
        }

        currentInput += value;
        display.value = currentInput;
    });
});

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return 0;
    }
}