let numOne, numTwo;
let operator;
let finalNum;
let refreshScreen = false;
let completedOp = false;

const currentDisplay = document.getElementById('currentDisplay');
const prevDisplay = document.getElementById('prevDisplay');
const numButtons = document.querySelectorAll('.numButton');
const opButtons = document.querySelectorAll('.opButton');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalsButton = document.getElementById('equals');
const posNegButton = document.getElementById('pos-neg');

numButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (currentDisplay.textContent === '0' || refreshScreen){
            refresh();
        }
        const numValue = button.getAttribute('data-num');
        currentDisplay.textContent += numValue;
    })
});

opButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (!currentDisplay.textContent)
            return;
        else
            opValue = button.getAttribute('data-num');
            operator = opValue;
            numOne = Number(currentDisplay.textContent);
            refreshScreen = true;
            completedOp = false;
            prevDisplay.textContent = numOne + ' ' + operator;
    })
});

clearButton.addEventListener('click', () => {
    currentDisplay.textContent = '0';
    prevDisplay.textContent = '\xa0';
    numOne = undefined;
    numTwo = undefined;
    operator = undefined;
    completedOp = false;
});

deleteButton.addEventListener('click', () => {
    newVal = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
    currentDisplay.textContent = newVal;
});

equalsButton.addEventListener('click', () => {
    if (completedOp) {
        prevDisplay.textContent = numOne + ' ' + operator + ' ' + numTwo;
        refreshScreen = true;
        operate(numOne, numTwo, operator)
    }
    else if (!currentDisplay.textContent || !operator)
        return;
    else {
        numTwo = Number(currentDisplay.textContent);
        prevDisplay.textContent = numOne + ' ' + operator + ' ' + numTwo;
        refreshScreen = true;
        completedOp = true;
        operate(numOne, numTwo, operator)
    }
});

posNegButton.addEventListener('click', () => {
    if (Number(currentDisplay.textContent) > 0)
        currentDisplay.textContent = (Number(currentDisplay.textContent) * -1);
    else 
        currentDisplay.textContent = (Math.abs(Number(currentDisplay.textContent)));
});

function refresh(){
    currentDisplay.textContent = '';
    refreshScreen = false;
}

function operate(one, two, op){
    console.log(numOne + '   ' + numTwo + '   ' + operator);
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
    numOne = finalNum;
}

function subtract(num1, num2){
    finalNum = num1 - num2;
    currentDisplay.textContent = finalNum;
    numOne = finalNum;
}

function multiply(num1, num2){
    finalNum = num1 * num2;
    currentDisplay.textContent = finalNum;
    numOne = finalNum;
}

function divide(num1, num2){
    finalNum = num1 / num2;
    currentDisplay.textContent = finalNum;
    numOne = finalNum;
}