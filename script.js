let numOne, numTwo;
let operator;
let finalNum;
let refreshScreen = false;

const currentDisplay = document.getElementById('currentDisplay');
const prevDisplay = document.getElementById('prevDisplay');
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
        if (currentDisplay.textContent === '0' || refreshScreen){
            refresh();
        }
        currentDisplay.textContent += e.target.textContent;
    }
});

opButtons.addEventListener('click', (e) => {
    if (!currentDisplay.textContent)
        return;
    else
        operator = e.target.textContent;
        numOne = Number(currentDisplay.textContent);
        refreshScreen = true;
        prevDisplay.textContent = numOne + ' ' + operator;
});

clearButton.addEventListener('click', () => {
    currentDisplay.textContent = '0';
    prevDisplay.textContent = '';
    numOne = undefined;
    numTwo = undefined;
    operator = undefined;
});

deleteButton.addEventListener('click', () => {
    newVal = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
    currentDisplay.textContent = newVal;
});

equalsButton.addEventListener('click', () => {
    if (!currentDisplay.textContent)
        return;
    else {
        numTwo = Number(currentDisplay.textContent);
        operate(numOne, numTwo, operator)
        refreshScreen = true;
        prevDisplay.textContent += ' ' + numTwo;
    }
});

function refresh(){
    currentDisplay.textContent = '';
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
    currentDisplay.textContent = finalNum;
    num1 = finalNum;
}

function subtract(num1, num2){
    finalNum = num1 - num2;
    currentDisplay.textContent = finalNum;
    num1 = finalNum;
}

function multiply(num1, num2){
    finalNum = num1 * num2;
    currentDisplay.textContent = finalNum;
    num1 = finalNum;
}

function divide(num1, num2){
    finalNum = num1 / num2;
    currentDisplay.textContent = finalNum;
    num1 = finalNum;
}