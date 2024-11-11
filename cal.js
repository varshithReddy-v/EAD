// JavaScript for Calculator Functionality
const calculatorScreen = document.getElementById('calculator-screen');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let firstOperand = null;
let operator = null;
let shouldResetScreen = false;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'C') {
            resetCalculator();
        } else if (value === '=') {
            evaluateExpression();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

function appendNumber(number) {
    if (calculatorScreen.value === '0' || shouldResetScreen) {
        resetScreen();
    }
    calculatorScreen.value += number;
}

function resetScreen() {
    calculatorScreen.value = '';
    shouldResetScreen = false;
}

function resetCalculator() {
    calculatorScreen.value = '';
    currentInput = '';
    firstOperand = null;
    operator = null;
    shouldResetScreen = false;
}

function setOperator(op) {
    if (operator !== null) evaluateExpression();
    firstOperand = calculatorScreen.value;
    operator = op;
    shouldResetScreen = true;
}

function evaluateExpression() {
    if (operator === null || shouldResetScreen) return;

    const secondOperand = calculatorScreen.value;
    calculatorScreen.value = calculate(firstOperand, secondOperand, operator);
    operator = null;
    shouldResetScreen = true;
}

function calculate(first, second, op) {
    const firstNum = parseFloat(first);
    const secondNum = parseFloat(second);

    switch (op) {
        case '+':
            return firstNum + secondNum;
        case '-':
            return firstNum - secondNum;
        case '*':
            return firstNum * secondNum;
        case '/':
            return firstNum / secondNum;
        default:
            return '';
    }
}
