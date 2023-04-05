let numOne;
let numTwo;
let operator;

const calcDisplay = document.getElementById('display');
const numButtons = document.getElementById('numButtons');
const opButtons = document.getElementById('opButtons');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalsButton = document.getElementById('equals');

numButtons.addEventListener('click', (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton || e.target.id === 'equals')
        return;
    else {
        if (operator && !numTwo){
            calcDisplay.textContent = e.target.textContent;
            numTwo = Number(e.target.textContent);
        }
        else
            calcDisplay.textContent += e.target.textContent;
    }
});

opButtons.addEventListener('click', (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton || !calcDisplay.textContent)
        return;
    else
        operator = e.target.textContent;
        numOne = Number(calcDisplay.textContent);
});

clearButton.addEventListener('click', () => {
    calcDisplay.textContent = '';
    numOne = null;
    numTwo = null;
    operator = null;
});

deleteButton.addEventListener('click', () => {
    newVal = calcDisplay.textContent.slice(0, calcDisplay.textContent.length - 1);
    calcDisplay.textContent = newVal;
});

equalsButton.addEventListener('click', () => {
    if (!calcDisplay.textContent)
        return;
    else {
        numTwo = Number(calcDisplay.textContent);
        operate(numOne, numTwo, operator)
    }
});

function operate(one, two, op){
    switch (op){
        case '+':
            add(one, two);
            break;
        case '-':
            subtract(one, two);
            break;
        case '*':
            multiply(one, two);
            break;
        case '/':
            divide(one, two);
            break;
        default:
            console.log('Invalid operator');
    }
}

function add(num1, num2){
    newNum = num1 + num2;
    calcDisplay.textContent = newNum;
}

function subtract(num1, num2){
    newNum = num1 - num2;
    calcDisplay.textContent = newNum;
}

function multiply(num1, num2){
    newNum = num1 * num2;
    calcDisplay.textContent = newNum;
}

function divide(num1, num2){
    newNum = num1 / num2;
    calcDisplay.textContent = newNum;
}