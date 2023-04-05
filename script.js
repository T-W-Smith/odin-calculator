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
    else
        calcDisplay.textContent += e.target.textContent;
});

opButtons.addEventListener('click', (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton || !calcDisplay.textContent)
        return;
    else {
        numOne = Number(calcDisplay.textContent);
        operator = e.target.textContent;
    }
});

clearButton.addEventListener('click', clearDisplay);

deleteButton.addEventListener('click', (e) => {
    newVal = calcDisplay.textContent.slice(0, calcDisplay.textContent.length - 1);
    calcDisplay.textContent = newVal;
})

equalsButton.addEventListener('click', (e) => {
    if (!calcDisplay.textContent)
        return;
    else {
        numTwo = Number(calcDisplay.textContent);
        clearDisplay();
        operate(numOne, numTwo, operator)
    }
})

function clearDisplay(){
    calcDisplay.textContent = '';
}

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