const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('button');
let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            screen.textContent = '0';
            return;
        }
        if (value === '=') {
            if (currentInput && previousInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                screen.textContent = currentInput;
                previousInput = '';
                operator = '';
            }
            return;
        }
        if (['+', '−', '×', '÷'].includes(value)) {
            if (currentInput && previousInput) {
                currentInput = calculate(previousInput, currentInput, operator);
                screen.textContent = currentInput;
            }
            previousInput = currentInput;
            currentInput = '';
            operator = value;
            return;
        }
        if (value === '.' && currentInput.includes('.')) {
            return; 
        }

        currentInput += value;
        screen.textContent = currentInput;
    });
});

function calculate(first, second, operator) {
    first = parseFloat(first);
    second = parseFloat(second);
    switch (operator) {
        case '+':
            return (first + second).toString();
        case '−':
            return (first - second).toString();
        case '×':
            return (first * second).toString();
        case '÷':
            if (second === 0) {
                alert('Cannot divide by 0');
                return '';
            }
            return (first / second).toString();
        default:
            return second;
    }
}
