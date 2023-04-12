let numOne, numTwo;
let operator;
let finalNum;
let refreshScreen = false;

const calcDisplay = document.getElementById('display');
const numButtons = document.getElementById('numButtons');
const opButtons = document.getElementById('opButtons');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalsButton = document.getElementById('equals');

numButtons.addEventListener('click', (e) => {
    console.log(refreshScreen);
    if (e.target.id === 'equals')
        return;
    else {
        if (calcDisplay.textContent === '0' || refreshScreen){
            refresh();
        }
        calcDisplay.textContent += e.target.textContent;
    }
});

opButtons.addEventListener('click', (e) => {
    if (!calcDisplay.textContent)
        return;
    else
        operator = e.target.textContent;
        numOne = Number(calcDisplay.textContent);
        refreshScreen = true;
});

clearButton.addEventListener('click', () => {
    calcDisplay.textContent = '0';
    numOne = undefined;
    numTwo = undefined;
    operator = undefined;
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
        refreshScreen = true;
    }
});

function refresh(){
    calcDisplay.textContent = '';
    refreshScreen = false;
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
    finalNum = num1 + num2;
    calcDisplay.textContent = finalNum;
    num1 = finalNum;
}

function subtract(num1, num2){
    finalNum = num1 - num2;
    calcDisplay.textContent = finalNum;
    num1 = finalNum;
}

function multiply(num1, num2){
    finalNum = num1 * num2;
    calcDisplay.textContent = finalNum;
    num1 = finalNum;
}

function divide(num1, num2){
    finalNum = num1 / num2;
    calcDisplay.textContent = finalNum;
    num1 = finalNum;
}